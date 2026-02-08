"""
Test suite for New Features:
- Password Reset Flow (forgot-password, reset-password)
- Email Verification (send-verification, verify-email)
- PubMed Search Filters (date_from, date_to, study_type)
- Weekly Research Digest (preview, send-test, send-all)
"""
import pytest
import requests
import os
import uuid
from datetime import datetime

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')


class TestPasswordReset:
    """Password Reset Flow tests"""
    
    def test_forgot_password_existing_user(self):
        """Test forgot password for existing user returns success message"""
        # First create a user
        test_email = f"test_reset_{uuid.uuid4().hex[:8]}@test.com"
        register_response = requests.post(
            f"{BASE_URL}/api/auth/register",
            json={"email": test_email, "password": "testpass123"}
        )
        assert register_response.status_code == 201, f"Failed to create user: {register_response.text}"
        
        # Request password reset
        response = requests.post(
            f"{BASE_URL}/api/auth/forgot-password",
            json={"email": test_email}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "message" in data
        assert "email" in data["message"].lower() or "account" in data["message"].lower()
        print(f"Forgot password response: {data['message']}")
    
    def test_forgot_password_nonexistent_user(self):
        """Test forgot password for non-existent user still returns success (security)"""
        response = requests.post(
            f"{BASE_URL}/api/auth/forgot-password",
            json={"email": "nonexistent_user_12345@test.com"}
        )
        # Should return 200 to prevent email enumeration
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "message" in data
        print(f"Non-existent user forgot password: {data['message']}")
    
    def test_forgot_password_invalid_email(self):
        """Test forgot password with invalid email format"""
        response = requests.post(
            f"{BASE_URL}/api/auth/forgot-password",
            json={"email": "not-an-email"}
        )
        # Should return 422 for validation error
        assert response.status_code == 422, f"Expected 422, got {response.status_code}: {response.text}"
        print("Invalid email format rejected correctly")
    
    def test_reset_password_invalid_token(self):
        """Test reset password with invalid token"""
        response = requests.post(
            f"{BASE_URL}/api/auth/reset-password",
            json={"token": "invalid-token-12345", "new_password": "newpass123"}
        )
        assert response.status_code == 400, f"Expected 400, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "detail" in data
        assert "invalid" in data["detail"].lower() or "expired" in data["detail"].lower()
        print(f"Invalid token rejection: {data['detail']}")
    
    def test_reset_password_short_password(self):
        """Test reset password with too short password"""
        response = requests.post(
            f"{BASE_URL}/api/auth/reset-password",
            json={"token": "some-token", "new_password": "123"}
        )
        # Should return 422 for validation error (min 6 chars)
        assert response.status_code == 422, f"Expected 422, got {response.status_code}: {response.text}"
        print("Short password rejected correctly")


class TestEmailVerification:
    """Email Verification tests"""
    
    def test_send_verification_requires_auth(self):
        """Test send verification requires valid token"""
        response = requests.post(
            f"{BASE_URL}/api/auth/send-verification",
            params={"token": "invalid-token"}
        )
        assert response.status_code == 401, f"Expected 401, got {response.status_code}: {response.text}"
        print("Send verification requires valid auth token")
    
    def test_send_verification_with_valid_token(self):
        """Test send verification with valid user token"""
        # First create and login a user
        test_email = f"test_verify_{uuid.uuid4().hex[:8]}@test.com"
        register_response = requests.post(
            f"{BASE_URL}/api/auth/register",
            json={"email": test_email, "password": "testpass123"}
        )
        assert register_response.status_code == 201
        
        token = register_response.json()["access_token"]
        
        # Request verification email
        response = requests.post(
            f"{BASE_URL}/api/auth/send-verification",
            params={"token": token}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "message" in data
        print(f"Send verification response: {data['message']}")
    
    def test_verify_email_invalid_token(self):
        """Test verify email with invalid token"""
        response = requests.post(
            f"{BASE_URL}/api/auth/verify-email",
            json={"token": "invalid-verification-token"}
        )
        assert response.status_code == 400, f"Expected 400, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "detail" in data
        print(f"Invalid verification token rejection: {data['detail']}")


class TestPubMedSearchFilters:
    """PubMed Search with Filters tests"""
    
    def test_pubmed_search_basic(self):
        """Test basic PubMed search without filters"""
        response = requests.get(
            f"{BASE_URL}/api/pubmed/search",
            params={"query": "integrative medicine", "max_results": 5}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "articles" in data
        assert "total_count" in data
        assert "query" in data
        assert isinstance(data["articles"], list)
        print(f"Basic search returned {len(data['articles'])} articles, total: {data['total_count']}")
    
    def test_pubmed_search_with_date_from(self):
        """Test PubMed search with date_from filter"""
        response = requests.get(
            f"{BASE_URL}/api/pubmed/search",
            params={"query": "cancer treatment", "max_results": 5, "date_from": "2023"}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "articles" in data
        print(f"Search with date_from=2023 returned {len(data['articles'])} articles")
    
    def test_pubmed_search_with_date_to(self):
        """Test PubMed search with date_to filter"""
        response = requests.get(
            f"{BASE_URL}/api/pubmed/search",
            params={"query": "diabetes", "max_results": 5, "date_to": "2024"}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "articles" in data
        print(f"Search with date_to=2024 returned {len(data['articles'])} articles")
    
    def test_pubmed_search_with_date_range(self):
        """Test PubMed search with both date_from and date_to"""
        response = requests.get(
            f"{BASE_URL}/api/pubmed/search",
            params={
                "query": "clinical trial",
                "max_results": 5,
                "date_from": "2022",
                "date_to": "2024"
            }
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "articles" in data
        print(f"Search with date range 2022-2024 returned {len(data['articles'])} articles")
    
    def test_pubmed_search_with_study_type_clinical_trial(self):
        """Test PubMed search with study_type=clinical_trial"""
        response = requests.get(
            f"{BASE_URL}/api/pubmed/search",
            params={"query": "aspirin", "max_results": 5, "study_type": "clinical_trial"}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "articles" in data
        print(f"Search with study_type=clinical_trial returned {len(data['articles'])} articles")
    
    def test_pubmed_search_with_study_type_meta_analysis(self):
        """Test PubMed search with study_type=meta_analysis"""
        response = requests.get(
            f"{BASE_URL}/api/pubmed/search",
            params={"query": "hypertension", "max_results": 5, "study_type": "meta_analysis"}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "articles" in data
        print(f"Search with study_type=meta_analysis returned {len(data['articles'])} articles")
    
    def test_pubmed_search_with_study_type_review(self):
        """Test PubMed search with study_type=review"""
        response = requests.get(
            f"{BASE_URL}/api/pubmed/search",
            params={"query": "vitamin D", "max_results": 5, "study_type": "review"}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "articles" in data
        print(f"Search with study_type=review returned {len(data['articles'])} articles")
    
    def test_pubmed_search_with_study_type_rct(self):
        """Test PubMed search with study_type=randomized_controlled_trial"""
        response = requests.get(
            f"{BASE_URL}/api/pubmed/search",
            params={"query": "exercise", "max_results": 5, "study_type": "randomized_controlled_trial"}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "articles" in data
        print(f"Search with study_type=randomized_controlled_trial returned {len(data['articles'])} articles")
    
    def test_pubmed_search_combined_filters(self):
        """Test PubMed search with multiple filters combined"""
        response = requests.get(
            f"{BASE_URL}/api/pubmed/search",
            params={
                "query": "cancer",
                "max_results": 5,
                "date_from": "2023",
                "date_to": "2024",
                "study_type": "clinical_trial"
            }
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "articles" in data
        print(f"Combined filters search returned {len(data['articles'])} articles")
    
    def test_pubmed_search_empty_query(self):
        """Test PubMed search with empty query"""
        response = requests.get(
            f"{BASE_URL}/api/pubmed/search",
            params={"query": "", "max_results": 5}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert data["articles"] == []
        assert data["total_count"] == 0
        print("Empty query returns empty results correctly")


class TestWeeklyDigest:
    """Weekly Research Digest tests"""
    
    def test_digest_preview(self):
        """Test GET /api/digest/preview returns article preview"""
        response = requests.get(f"{BASE_URL}/api/digest/preview")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "articles" in data
        assert "topic" in data
        assert "generated_at" in data
        assert isinstance(data["articles"], list)
        print(f"Digest preview returned {len(data['articles'])} articles for topic: {data['topic']}")
    
    def test_digest_send_test(self):
        """Test POST /api/digest/send-test sends test email"""
        test_email = "test@example.com"
        response = requests.post(
            f"{BASE_URL}/api/digest/send-test",
            params={"email": test_email}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "message" in data
        assert "articles_count" in data
        print(f"Send test digest response: {data['message']}, articles: {data['articles_count']}")
    
    def test_digest_send_all(self):
        """Test POST /api/digest/send-all sends to all subscribers"""
        response = requests.post(f"{BASE_URL}/api/digest/send-all")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "message" in data
        assert "sent_count" in data
        print(f"Send all digest response: {data['message']}, sent to: {data['sent_count']} subscribers")
    
    def test_digest_subscribe(self):
        """Test digest subscription endpoint"""
        test_email = f"digest_test_{uuid.uuid4().hex[:8]}@test.com"
        response = requests.post(
            f"{BASE_URL}/api/digest/subscribe",
            json={
                "email": test_email,
                "frequency": "weekly",
                "topics": ["integrative medicine", "natural compounds"]
            }
        )
        assert response.status_code == 201, f"Expected 201, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert data["email"] == test_email
        assert data["frequency"] == "weekly"
        assert data["status"] == "active"
        print(f"Subscribed {test_email} to weekly digest")
    
    def test_digest_unsubscribe(self):
        """Test digest unsubscribe endpoint"""
        # First subscribe
        test_email = f"unsub_test_{uuid.uuid4().hex[:8]}@test.com"
        sub_response = requests.post(
            f"{BASE_URL}/api/digest/subscribe",
            json={"email": test_email, "frequency": "weekly", "topics": []}
        )
        assert sub_response.status_code == 201
        
        # Then unsubscribe
        response = requests.delete(
            f"{BASE_URL}/api/digest/unsubscribe",
            params={"email": test_email}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "message" in data
        print(f"Unsubscribed {test_email}: {data['message']}")


class TestAuthEndpoints:
    """Additional auth endpoint tests"""
    
    def test_auth_me_with_valid_token(self):
        """Test /api/auth/me returns user info with valid token"""
        # Create user and get token
        test_email = f"test_me_{uuid.uuid4().hex[:8]}@test.com"
        register_response = requests.post(
            f"{BASE_URL}/api/auth/register",
            json={"email": test_email, "password": "testpass123"}
        )
        assert register_response.status_code == 201
        
        token = register_response.json()["access_token"]
        
        # Get user info
        response = requests.get(
            f"{BASE_URL}/api/auth/me",
            params={"token": token}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert data["email"] == test_email
        assert "id" in data
        print(f"Auth me returned user: {data['email']}")
    
    def test_auth_me_with_invalid_token(self):
        """Test /api/auth/me rejects invalid token"""
        response = requests.get(
            f"{BASE_URL}/api/auth/me",
            params={"token": "invalid-token-12345"}
        )
        assert response.status_code == 401, f"Expected 401, got {response.status_code}: {response.text}"
        print("Invalid token rejected correctly")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
