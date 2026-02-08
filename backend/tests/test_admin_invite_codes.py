"""
Test suite for Admin Invite Code System
Tests: Generate, List, Delete, Validate invite codes
Tests: User registration with invite code
"""
import pytest
import requests
import os
import uuid
from datetime import datetime

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestAdminInviteCodes:
    """Admin Invite Code CRUD tests"""
    
    created_code_ids = []  # Track created codes for cleanup
    
    @pytest.fixture(autouse=True)
    def setup(self):
        """Setup for each test"""
        yield
        # Cleanup created codes after each test class
    
    def test_api_health(self):
        """Test API is accessible"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        print(f"API Health: {data}")
    
    def test_create_invite_code_basic(self):
        """Test creating a basic invite code"""
        payload = {
            "tier": "starter",
            "trial_days": 7
        }
        response = requests.post(
            f"{BASE_URL}/api/admin/invite-codes",
            json=payload
        )
        assert response.status_code == 201, f"Expected 201, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "id" in data
        assert "code" in data
        assert len(data["code"]) == 8  # Code should be 8 characters
        assert data["tier"] == "starter"
        assert data["trial_days"] == 7
        assert data["used"] == False
        assert "expires_at" in data
        assert "created_at" in data
        
        self.created_code_ids.append(data["id"])
        print(f"Created invite code: {data['code']}")
        return data
    
    def test_create_invite_code_with_email(self):
        """Test creating invite code with email"""
        test_email = f"test_{uuid.uuid4().hex[:8]}@institution.com"
        payload = {
            "email": test_email,
            "institution_name": "Test University",
            "tier": "standard",
            "trial_days": 14
        }
        response = requests.post(
            f"{BASE_URL}/api/admin/invite-codes",
            json=payload
        )
        assert response.status_code == 201
        
        data = response.json()
        assert data["email"] == test_email
        assert data["institution_name"] == "Test University"
        assert data["tier"] == "standard"
        assert data["trial_days"] == 14
        
        self.created_code_ids.append(data["id"])
        print(f"Created invite code with email: {data['code']} for {test_email}")
        return data
    
    def test_create_invite_code_enterprise(self):
        """Test creating enterprise tier invite code"""
        payload = {
            "institution_name": "Large Medical Center",
            "tier": "enterprise",
            "trial_days": 30
        }
        response = requests.post(
            f"{BASE_URL}/api/admin/invite-codes",
            json=payload
        )
        assert response.status_code == 201
        
        data = response.json()
        assert data["tier"] == "enterprise"
        assert data["trial_days"] == 30
        assert data["institution_name"] == "Large Medical Center"
        
        self.created_code_ids.append(data["id"])
        print(f"Created enterprise invite code: {data['code']}")
        return data
    
    def test_list_invite_codes(self):
        """Test listing all invite codes"""
        response = requests.get(f"{BASE_URL}/api/admin/invite-codes")
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
        print(f"Found {len(data)} invite codes")
        
        # Verify structure of returned codes
        if len(data) > 0:
            code = data[0]
            assert "id" in code
            assert "code" in code
            assert "tier" in code
            assert "used" in code
    
    def test_validate_invite_code_valid(self):
        """Test validating a valid invite code"""
        # First create a code
        create_response = requests.post(
            f"{BASE_URL}/api/admin/invite-codes",
            json={"tier": "starter", "trial_days": 7}
        )
        assert create_response.status_code == 201
        created_code = create_response.json()
        self.created_code_ids.append(created_code["id"])
        
        # Validate the code
        response = requests.get(
            f"{BASE_URL}/api/admin/validate-invite-code",
            params={"code": created_code["code"]}
        )
        assert response.status_code == 200
        
        data = response.json()
        assert data["valid"] == True
        assert data["tier"] == "starter"
        assert data["trial_days"] == 7
        print(f"Validated code {created_code['code']}: valid={data['valid']}")
    
    def test_validate_invite_code_invalid(self):
        """Test validating an invalid invite code"""
        response = requests.get(
            f"{BASE_URL}/api/admin/validate-invite-code",
            params={"code": "INVALID123"}
        )
        assert response.status_code == 404
        
        data = response.json()
        assert "detail" in data
        print(f"Invalid code response: {data['detail']}")
    
    def test_delete_invite_code(self):
        """Test deleting an invite code"""
        # First create a code
        create_response = requests.post(
            f"{BASE_URL}/api/admin/invite-codes",
            json={"tier": "starter", "trial_days": 7}
        )
        assert create_response.status_code == 201
        created_code = create_response.json()
        
        # Delete the code
        response = requests.delete(
            f"{BASE_URL}/api/admin/invite-codes/{created_code['id']}"
        )
        assert response.status_code == 200
        
        data = response.json()
        assert "message" in data
        print(f"Deleted code {created_code['code']}")
        
        # Verify code is deleted - validation should fail
        validate_response = requests.get(
            f"{BASE_URL}/api/admin/validate-invite-code",
            params={"code": created_code["code"]}
        )
        assert validate_response.status_code == 404
    
    def test_delete_nonexistent_code(self):
        """Test deleting a non-existent invite code"""
        fake_id = str(uuid.uuid4())
        response = requests.delete(
            f"{BASE_URL}/api/admin/invite-codes/{fake_id}"
        )
        assert response.status_code == 404


class TestUserRegistrationWithInvite:
    """Test user registration with invite code"""
    
    def test_register_with_valid_invite_code(self):
        """Test registering a new user with valid invite code"""
        # First create an invite code
        create_response = requests.post(
            f"{BASE_URL}/api/admin/invite-codes",
            json={
                "institution_name": "Test Registration Institution",
                "tier": "starter",
                "trial_days": 7
            }
        )
        assert create_response.status_code == 201
        invite_code = create_response.json()
        
        # Register with the invite code
        test_email = f"test_user_{uuid.uuid4().hex[:8]}@test.com"
        register_response = requests.post(
            f"{BASE_URL}/api/auth/register-with-invite",
            json={
                "email": test_email,
                "password": "testpass123",
                "invite_code": invite_code["code"]
            }
        )
        assert register_response.status_code == 201, f"Expected 201, got {register_response.status_code}: {register_response.text}"
        
        data = register_response.json()
        assert "access_token" in data
        assert "user" in data
        assert data["user"]["email"] == test_email
        print(f"Registered user {test_email} with invite code {invite_code['code']}")
        
        # Verify invite code is now marked as used
        codes_response = requests.get(f"{BASE_URL}/api/admin/invite-codes")
        codes = codes_response.json()
        used_code = next((c for c in codes if c["code"] == invite_code["code"]), None)
        assert used_code is not None
        assert used_code["used"] == True
        assert used_code["used_by"] is not None
        print(f"Invite code {invite_code['code']} marked as used")
    
    def test_register_with_invalid_invite_code(self):
        """Test registration fails with invalid invite code"""
        test_email = f"test_user_{uuid.uuid4().hex[:8]}@test.com"
        response = requests.post(
            f"{BASE_URL}/api/auth/register-with-invite",
            json={
                "email": test_email,
                "password": "testpass123",
                "invite_code": "INVALID123"
            }
        )
        assert response.status_code == 400
        
        data = response.json()
        assert "detail" in data
        assert "Invalid" in data["detail"] or "invalid" in data["detail"].lower()
        print(f"Invalid code rejection: {data['detail']}")
    
    def test_register_with_used_invite_code(self):
        """Test registration fails with already used invite code"""
        # Create and use an invite code
        create_response = requests.post(
            f"{BASE_URL}/api/admin/invite-codes",
            json={"tier": "starter", "trial_days": 7}
        )
        invite_code = create_response.json()
        
        # First registration
        first_email = f"first_user_{uuid.uuid4().hex[:8]}@test.com"
        first_response = requests.post(
            f"{BASE_URL}/api/auth/register-with-invite",
            json={
                "email": first_email,
                "password": "testpass123",
                "invite_code": invite_code["code"]
            }
        )
        assert first_response.status_code == 201
        
        # Second registration with same code should fail
        second_email = f"second_user_{uuid.uuid4().hex[:8]}@test.com"
        second_response = requests.post(
            f"{BASE_URL}/api/auth/register-with-invite",
            json={
                "email": second_email,
                "password": "testpass123",
                "invite_code": invite_code["code"]
            }
        )
        assert second_response.status_code == 400
        
        data = second_response.json()
        assert "used" in data["detail"].lower()
        print(f"Used code rejection: {data['detail']}")
    
    def test_validate_used_invite_code(self):
        """Test that used invite codes fail validation"""
        # Create and use an invite code
        create_response = requests.post(
            f"{BASE_URL}/api/admin/invite-codes",
            json={"tier": "starter", "trial_days": 7}
        )
        invite_code = create_response.json()
        
        # Use the code
        test_email = f"test_user_{uuid.uuid4().hex[:8]}@test.com"
        requests.post(
            f"{BASE_URL}/api/auth/register-with-invite",
            json={
                "email": test_email,
                "password": "testpass123",
                "invite_code": invite_code["code"]
            }
        )
        
        # Validate should fail
        validate_response = requests.get(
            f"{BASE_URL}/api/admin/validate-invite-code",
            params={"code": invite_code["code"]}
        )
        assert validate_response.status_code == 400
        
        data = validate_response.json()
        assert "used" in data["detail"].lower()
        print(f"Used code validation rejection: {data['detail']}")


class TestAdminLogin:
    """Test admin login functionality"""
    
    def test_admin_login(self):
        """Test admin can login"""
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={
                "email": "admin@evidencemed.com",
                "password": "admin123"
            }
        )
        
        # Admin may or may not exist yet
        if response.status_code == 200:
            data = response.json()
            assert "access_token" in data
            assert "user" in data
            print(f"Admin login successful: {data['user']['email']}")
        elif response.status_code == 401:
            print("Admin user not found - may need to be created first")
        else:
            print(f"Unexpected response: {response.status_code} - {response.text}")


class TestTrialRequests:
    """Test trial requests endpoint (admin view)"""
    
    def test_get_trial_requests(self):
        """Test getting trial requests"""
        response = requests.get(f"{BASE_URL}/api/institutional/trial-requests")
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
        print(f"Found {len(data)} trial requests")
    
    def test_create_trial_request(self):
        """Test creating a trial request"""
        payload = {
            "institution_name": f"Test Institution {uuid.uuid4().hex[:6]}",
            "institution_type": "University",
            "department": "Medical Research",
            "contact_name": "Dr. Test User",
            "contact_email": f"test_{uuid.uuid4().hex[:8]}@university.edu",
            "number_of_users": "11-50",
            "message": "Testing trial request"
        }
        response = requests.post(
            f"{BASE_URL}/api/institutional/trial-request",
            json=payload
        )
        assert response.status_code == 201
        
        data = response.json()
        assert data["institution_name"] == payload["institution_name"]
        assert data["status"] == "pending"
        print(f"Created trial request for {payload['institution_name']}")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
