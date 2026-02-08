"""
Test Practitioner Verification and Compound Annotations Features
Tests for:
- POST /api/practitioners/verify - Submit verification request
- GET /api/practitioners/my-status - Get user's verification status
- GET /api/admin/practitioner-verifications - Get all verifications (admin)
- PUT /api/admin/practitioner-verifications/{id} - Approve/reject verifications
- POST /api/compounds/{id}/annotations - Create annotations
- GET /api/compounds/{id}/annotations - Get compound annotations
"""

import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Test credentials
ADMIN_EMAIL = "admin@evidencemed.com"
ADMIN_PASSWORD = "admin123"

class TestPractitionerVerification:
    """Tests for practitioner verification endpoints"""
    
    @pytest.fixture(scope="class")
    def admin_token(self):
        """Get admin auth token"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        if response.status_code == 200:
            return response.json().get("access_token")
        pytest.skip("Admin login failed - skipping authenticated tests")
    
    @pytest.fixture(scope="class")
    def test_user(self):
        """Create a test user for verification tests"""
        test_email = f"TEST_practitioner_{uuid.uuid4().hex[:8]}@test.com"
        test_password = "testpass123"
        
        # Register new user
        response = requests.post(f"{BASE_URL}/api/auth/register", json={
            "email": test_email,
            "password": test_password
        })
        
        if response.status_code == 201:
            data = response.json()
            return {
                "email": test_email,
                "password": test_password,
                "token": data.get("access_token"),
                "user_id": data.get("user", {}).get("id")
            }
        elif response.status_code == 409:
            # User exists, try login
            login_response = requests.post(f"{BASE_URL}/api/auth/login", json={
                "email": test_email,
                "password": test_password
            })
            if login_response.status_code == 200:
                data = login_response.json()
                return {
                    "email": test_email,
                    "password": test_password,
                    "token": data.get("access_token"),
                    "user_id": data.get("user", {}).get("id")
                }
        
        pytest.skip("Could not create test user")
    
    def test_submit_verification_request(self, test_user):
        """Test POST /api/practitioners/verify - Submit verification request"""
        response = requests.post(
            f"{BASE_URL}/api/practitioners/verify",
            headers={"Authorization": f"Bearer {test_user['token']}"},
            json={
                "license_number": "MD12345",
                "license_state": "California",
                "specialty": "Integrative Medicine",
                "institution": "Test Medical Center",
                "years_experience": 10,
                "credentials": "MD",
                "bio": "Test practitioner bio"
            }
        )
        
        # Accept 200, 201, or 400 (if already submitted)
        assert response.status_code in [200, 201, 400], f"Unexpected status: {response.status_code}, {response.text}"
        
        if response.status_code in [200, 201]:
            data = response.json()
            assert "id" in data
            assert data["status"] == "pending"
            assert data["credentials"] == "MD"
            assert data["specialty"] == "Integrative Medicine"
            print(f"Verification request submitted: {data['id']}")
        else:
            # Already submitted
            print(f"Verification already exists: {response.json()}")
    
    def test_get_my_verification_status(self, test_user):
        """Test GET /api/practitioners/my-status - Get user's verification status"""
        response = requests.get(
            f"{BASE_URL}/api/practitioners/my-status",
            headers={"Authorization": f"Bearer {test_user['token']}"}
        )
        
        assert response.status_code == 200, f"Failed: {response.status_code}, {response.text}"
        
        data = response.json()
        assert "status" in data
        assert data["status"] in ["not_submitted", "pending", "approved", "rejected"]
        print(f"Verification status: {data['status']}")
    
    def test_get_my_status_without_auth(self):
        """Test GET /api/practitioners/my-status without auth - should fail"""
        response = requests.get(f"{BASE_URL}/api/practitioners/my-status")
        
        # Should require authentication
        assert response.status_code in [401, 422], f"Expected auth error: {response.status_code}"
    
    def test_admin_get_all_verifications(self, admin_token):
        """Test GET /api/admin/practitioner-verifications - Admin gets all verifications"""
        response = requests.get(
            f"{BASE_URL}/api/admin/practitioner-verifications",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 200, f"Failed: {response.status_code}, {response.text}"
        
        data = response.json()
        assert isinstance(data, list)
        print(f"Found {len(data)} verification requests")
        
        # Check structure if there are any
        if len(data) > 0:
            verification = data[0]
            assert "id" in verification
            assert "user_email" in verification
            assert "status" in verification
            assert "credentials" in verification
    
    def test_admin_get_verifications_with_filter(self, admin_token):
        """Test GET /api/admin/practitioner-verifications with status filter"""
        response = requests.get(
            f"{BASE_URL}/api/admin/practitioner-verifications?status_filter=pending",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 200, f"Failed: {response.status_code}, {response.text}"
        
        data = response.json()
        assert isinstance(data, list)
        
        # All should be pending
        for v in data:
            assert v["status"] == "pending"
        
        print(f"Found {len(data)} pending verifications")


class TestAdminVerificationReview:
    """Tests for admin verification review functionality"""
    
    @pytest.fixture(scope="class")
    def admin_token(self):
        """Get admin auth token"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        if response.status_code == 200:
            return response.json().get("access_token")
        pytest.skip("Admin login failed")
    
    @pytest.fixture(scope="class")
    def pending_verification(self, admin_token):
        """Get a pending verification for testing"""
        response = requests.get(
            f"{BASE_URL}/api/admin/practitioner-verifications?status_filter=pending",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        if response.status_code == 200:
            data = response.json()
            if len(data) > 0:
                return data[0]
        
        return None
    
    def test_approve_verification(self, admin_token, pending_verification):
        """Test PUT /api/admin/practitioner-verifications/{id} - Approve verification"""
        if not pending_verification:
            pytest.skip("No pending verification to test")
        
        verification_id = pending_verification["id"]
        
        response = requests.put(
            f"{BASE_URL}/api/admin/practitioner-verifications/{verification_id}",
            headers={"Authorization": f"Bearer {admin_token}"},
            json={"status": "approved"}
        )
        
        # Accept 200 or 400 (if already reviewed)
        assert response.status_code in [200, 400], f"Failed: {response.status_code}, {response.text}"
        
        if response.status_code == 200:
            data = response.json()
            assert "message" in data
            print(f"Verification approved: {verification_id}")
        else:
            print(f"Verification already reviewed: {response.json()}")
    
    def test_reject_verification_invalid_id(self, admin_token):
        """Test PUT /api/admin/practitioner-verifications/{id} with invalid ID"""
        response = requests.put(
            f"{BASE_URL}/api/admin/practitioner-verifications/invalid-id-12345",
            headers={"Authorization": f"Bearer {admin_token}"},
            json={"status": "rejected", "rejection_reason": "Invalid credentials"}
        )
        
        assert response.status_code == 404, f"Expected 404: {response.status_code}"


class TestCompoundAnnotations:
    """Tests for compound annotation endpoints"""
    
    @pytest.fixture(scope="class")
    def user_token(self):
        """Get user auth token"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        if response.status_code == 200:
            return response.json().get("access_token")
        pytest.skip("Login failed")
    
    def test_get_compound_annotations_public(self):
        """Test GET /api/compounds/{id}/annotations - Public access"""
        # Use a test compound ID
        compound_id = "ashwagandha"
        
        response = requests.get(f"{BASE_URL}/api/compounds/{compound_id}/annotations")
        
        assert response.status_code == 200, f"Failed: {response.status_code}, {response.text}"
        
        data = response.json()
        assert isinstance(data, list)
        print(f"Found {len(data)} public annotations for {compound_id}")
    
    def test_get_compound_annotations_authenticated(self, user_token):
        """Test GET /api/compounds/{id}/annotations - Authenticated access"""
        compound_id = "ashwagandha"
        
        response = requests.get(
            f"{BASE_URL}/api/compounds/{compound_id}/annotations",
            headers={"Authorization": f"Bearer {user_token}"}
        )
        
        assert response.status_code == 200, f"Failed: {response.status_code}, {response.text}"
        
        data = response.json()
        assert isinstance(data, list)
        print(f"Found {len(data)} annotations for authenticated user")
    
    def test_create_annotation_research_insight(self, user_token):
        """Test POST /api/compounds/{id}/annotations - Create research insight"""
        compound_id = "curcumin"
        
        response = requests.post(
            f"{BASE_URL}/api/compounds/{compound_id}/annotations",
            headers={
                "Authorization": f"Bearer {user_token}",
                "Content-Type": "application/json"
            },
            json={
                "compound_id": compound_id,
                "annotation_type": "research_insight",
                "content": "TEST_annotation: Research shows promising results for inflammation.",
                "visibility": "members"
            }
        )
        
        assert response.status_code in [200, 201], f"Failed: {response.status_code}, {response.text}"
        
        data = response.json()
        assert "id" in data
        assert data["annotation_type"] == "research_insight"
        assert data["compound_id"] == compound_id
        print(f"Created annotation: {data['id']}")
        
        return data["id"]
    
    def test_create_annotation_dosage_guidance(self, user_token):
        """Test POST /api/compounds/{id}/annotations - Create dosage guidance"""
        compound_id = "ashwagandha"
        
        response = requests.post(
            f"{BASE_URL}/api/compounds/{compound_id}/annotations",
            headers={
                "Authorization": f"Bearer {user_token}",
                "Content-Type": "application/json"
            },
            json={
                "compound_id": compound_id,
                "annotation_type": "dosage_guidance",
                "content": "TEST_annotation: Typical dosage range is 300-600mg daily.",
                "visibility": "members"
            }
        )
        
        assert response.status_code in [200, 201], f"Failed: {response.status_code}, {response.text}"
        
        data = response.json()
        assert data["annotation_type"] == "dosage_guidance"
        print(f"Created dosage guidance annotation: {data['id']}")
    
    def test_create_clinical_note_requires_verification(self, user_token):
        """Test POST /api/compounds/{id}/annotations - Clinical note requires verification"""
        compound_id = "turmeric"
        
        # Create a new non-verified user
        test_email = f"TEST_nonverified_{uuid.uuid4().hex[:8]}@test.com"
        register_response = requests.post(f"{BASE_URL}/api/auth/register", json={
            "email": test_email,
            "password": "testpass123"
        })
        
        if register_response.status_code == 201:
            non_verified_token = register_response.json().get("access_token")
            
            response = requests.post(
                f"{BASE_URL}/api/compounds/{compound_id}/annotations",
                headers={
                    "Authorization": f"Bearer {non_verified_token}",
                    "Content-Type": "application/json"
                },
                json={
                    "compound_id": compound_id,
                    "annotation_type": "clinical_note",
                    "content": "TEST: This should fail for non-verified users",
                    "visibility": "members"
                }
            )
            
            # Should be forbidden for non-verified users
            assert response.status_code == 403, f"Expected 403: {response.status_code}, {response.text}"
            print("Clinical note correctly requires verification")
        else:
            pytest.skip("Could not create test user")
    
    def test_create_annotation_without_auth(self):
        """Test POST /api/compounds/{id}/annotations without auth - should fail"""
        compound_id = "ashwagandha"
        
        response = requests.post(
            f"{BASE_URL}/api/compounds/{compound_id}/annotations",
            json={
                "compound_id": compound_id,
                "annotation_type": "research_insight",
                "content": "This should fail",
                "visibility": "members"
            }
        )
        
        assert response.status_code in [401, 422], f"Expected auth error: {response.status_code}"


class TestAnnotationInteractions:
    """Tests for annotation helpful votes and deletion"""
    
    @pytest.fixture(scope="class")
    def user_token(self):
        """Get user auth token"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        if response.status_code == 200:
            return response.json().get("access_token")
        pytest.skip("Login failed")
    
    @pytest.fixture(scope="class")
    def test_annotation(self, user_token):
        """Create a test annotation"""
        compound_id = "ginseng"
        
        response = requests.post(
            f"{BASE_URL}/api/compounds/{compound_id}/annotations",
            headers={
                "Authorization": f"Bearer {user_token}",
                "Content-Type": "application/json"
            },
            json={
                "compound_id": compound_id,
                "annotation_type": "research_insight",
                "content": f"TEST_annotation_{uuid.uuid4().hex[:8]}: Test annotation for interactions",
                "visibility": "members"
            }
        )
        
        if response.status_code in [200, 201]:
            return response.json()
        return None
    
    def test_mark_annotation_helpful(self, user_token, test_annotation):
        """Test POST /api/annotations/{id}/helpful - Mark as helpful"""
        if not test_annotation:
            pytest.skip("No test annotation")
        
        annotation_id = test_annotation["id"]
        
        response = requests.post(
            f"{BASE_URL}/api/annotations/{annotation_id}/helpful",
            headers={"Authorization": f"Bearer {user_token}"}
        )
        
        assert response.status_code == 200, f"Failed: {response.status_code}, {response.text}"
        
        data = response.json()
        assert "helpful" in data
        print(f"Helpful vote: {data['helpful']}")
    
    def test_delete_annotation(self, user_token, test_annotation):
        """Test DELETE /api/annotations/{id} - Delete own annotation"""
        if not test_annotation:
            pytest.skip("No test annotation")
        
        annotation_id = test_annotation["id"]
        
        response = requests.delete(
            f"{BASE_URL}/api/annotations/{annotation_id}",
            headers={"Authorization": f"Bearer {user_token}"}
        )
        
        assert response.status_code in [200, 204], f"Failed: {response.status_code}, {response.text}"
        print(f"Annotation deleted: {annotation_id}")
    
    def test_delete_annotation_invalid_id(self, user_token):
        """Test DELETE /api/annotations/{id} with invalid ID"""
        response = requests.delete(
            f"{BASE_URL}/api/annotations/invalid-annotation-id",
            headers={"Authorization": f"Bearer {user_token}"}
        )
        
        assert response.status_code == 404, f"Expected 404: {response.status_code}"


class TestAPIEndpointsExist:
    """Basic tests to verify all required endpoints exist"""
    
    def test_practitioners_verify_endpoint_exists(self):
        """Verify POST /api/practitioners/verify endpoint exists"""
        response = requests.post(f"{BASE_URL}/api/practitioners/verify", json={})
        # Should return 401 (unauthorized) or 422 (validation), not 404
        assert response.status_code != 404, "Endpoint /api/practitioners/verify not found"
        print(f"POST /api/practitioners/verify exists (status: {response.status_code})")
    
    def test_practitioners_my_status_endpoint_exists(self):
        """Verify GET /api/practitioners/my-status endpoint exists"""
        response = requests.get(f"{BASE_URL}/api/practitioners/my-status")
        # Should return 401 (unauthorized) or 422, not 404
        assert response.status_code != 404, "Endpoint /api/practitioners/my-status not found"
        print(f"GET /api/practitioners/my-status exists (status: {response.status_code})")
    
    def test_admin_verifications_endpoint_exists(self):
        """Verify GET /api/admin/practitioner-verifications endpoint exists"""
        response = requests.get(f"{BASE_URL}/api/admin/practitioner-verifications")
        # Should return 200 (no auth required in current impl) or auth error, not 404
        assert response.status_code != 404, "Endpoint /api/admin/practitioner-verifications not found"
        print(f"GET /api/admin/practitioner-verifications exists (status: {response.status_code})")
    
    def test_compound_annotations_get_endpoint_exists(self):
        """Verify GET /api/compounds/{id}/annotations endpoint exists"""
        response = requests.get(f"{BASE_URL}/api/compounds/test-compound/annotations")
        # Should return 200 (empty list), not 404
        assert response.status_code == 200, f"Endpoint not working: {response.status_code}"
        print(f"GET /api/compounds/{{id}}/annotations exists (status: {response.status_code})")
    
    def test_compound_annotations_post_endpoint_exists(self):
        """Verify POST /api/compounds/{id}/annotations endpoint exists"""
        response = requests.post(f"{BASE_URL}/api/compounds/test-compound/annotations", json={})
        # Should return 401 (unauthorized) or 422 (validation), not 404
        assert response.status_code != 404, "Endpoint /api/compounds/{id}/annotations not found"
        print(f"POST /api/compounds/{{id}}/annotations exists (status: {response.status_code})")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
