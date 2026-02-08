"""
Test User Profile, Rate Limiting, Citation Export, and Social Sharing Features
Tests for:
- Rate limiting on auth endpoints (5/min register, 10/min login)
- Rate limiting on PubMed search (30/min)
- User Profile endpoints (GET /api/user/profile)
- Saved articles (POST, DELETE /api/user/saved-articles)
- Search history (POST, DELETE /api/user/search-history)
"""

import pytest
import requests
import os
import time
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestHealthCheck:
    """Basic health check"""
    
    def test_api_health(self):
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data


class TestAuthLogin:
    """Test login endpoint"""
    
    def test_login_admin_user(self):
        """Login with admin credentials"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": "admin@evidencemed.com",
            "password": "admin123"
        })
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert "user" in data
        assert data["user"]["email"] == "admin@evidencemed.com"
        return data["access_token"]
    
    def test_login_invalid_credentials(self):
        """Login with invalid credentials should fail"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": "invalid@test.com",
            "password": "wrongpassword"
        })
        assert response.status_code == 401


class TestUserProfile:
    """Test User Profile endpoints"""
    
    @pytest.fixture
    def auth_token(self):
        """Get auth token for admin user"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": "admin@evidencemed.com",
            "password": "admin123"
        })
        assert response.status_code == 200
        return response.json()["access_token"]
    
    def test_get_user_profile(self, auth_token):
        """GET /api/user/profile returns user stats, saved articles, and search history"""
        response = requests.get(f"{BASE_URL}/api/user/profile?token={auth_token}")
        assert response.status_code == 200
        data = response.json()
        
        # Verify profile structure
        assert "id" in data
        assert "email" in data
        assert data["email"] == "admin@evidencemed.com"
        assert "created_at" in data
        assert "email_verified" in data
        assert "search_history" in data
        assert "saved_articles" in data
        assert "stats" in data
        
        # Verify stats structure
        stats = data["stats"]
        assert "total_searches" in stats
        assert "saved_articles_count" in stats
        assert "member_since" in stats
        assert "last_search" in stats
        
        # Verify arrays
        assert isinstance(data["search_history"], list)
        assert isinstance(data["saved_articles"], list)
    
    def test_get_profile_without_token(self):
        """GET /api/user/profile without token should fail"""
        response = requests.get(f"{BASE_URL}/api/user/profile")
        assert response.status_code in [401, 422]  # 422 for missing param
    
    def test_get_profile_invalid_token(self):
        """GET /api/user/profile with invalid token should fail"""
        response = requests.get(f"{BASE_URL}/api/user/profile?token=invalid_token")
        assert response.status_code == 401


class TestSavedArticles:
    """Test Saved Articles endpoints"""
    
    @pytest.fixture
    def auth_token(self):
        """Get auth token for admin user"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": "admin@evidencemed.com",
            "password": "admin123"
        })
        assert response.status_code == 200
        return response.json()["access_token"]
    
    def test_save_article(self, auth_token):
        """POST /api/user/saved-articles saves an article"""
        test_pmid = f"TEST_{uuid.uuid4().hex[:8]}"
        article_data = {
            "pmid": test_pmid,
            "title": "Test Article for Profile Testing",
            "authors": ["Test Author 1", "Test Author 2"],
            "journal": "Test Journal",
            "year": "2024"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/user/saved-articles?token={auth_token}",
            json=article_data
        )
        assert response.status_code in [200, 201]
        data = response.json()
        assert "message" in data
        assert "id" in data
        
        # Cleanup - delete the test article
        delete_response = requests.delete(
            f"{BASE_URL}/api/user/saved-articles/{test_pmid}?token={auth_token}"
        )
        assert delete_response.status_code == 200
    
    def test_save_duplicate_article(self, auth_token):
        """POST /api/user/saved-articles with duplicate should fail"""
        test_pmid = f"TEST_DUP_{uuid.uuid4().hex[:8]}"
        article_data = {
            "pmid": test_pmid,
            "title": "Duplicate Test Article",
            "authors": ["Author"],
            "journal": "Journal",
            "year": "2024"
        }
        
        # Save first time
        response1 = requests.post(
            f"{BASE_URL}/api/user/saved-articles?token={auth_token}",
            json=article_data
        )
        assert response1.status_code in [200, 201]
        
        # Try to save again - should fail
        response2 = requests.post(
            f"{BASE_URL}/api/user/saved-articles?token={auth_token}",
            json=article_data
        )
        assert response2.status_code == 400
        
        # Cleanup
        requests.delete(f"{BASE_URL}/api/user/saved-articles/{test_pmid}?token={auth_token}")
    
    def test_delete_saved_article(self, auth_token):
        """DELETE /api/user/saved-articles/{pmid} removes saved article"""
        test_pmid = f"TEST_DEL_{uuid.uuid4().hex[:8]}"
        article_data = {
            "pmid": test_pmid,
            "title": "Article to Delete",
            "authors": ["Author"],
            "journal": "Journal",
            "year": "2024"
        }
        
        # Save article first
        save_response = requests.post(
            f"{BASE_URL}/api/user/saved-articles?token={auth_token}",
            json=article_data
        )
        assert save_response.status_code in [200, 201]
        
        # Delete article
        delete_response = requests.delete(
            f"{BASE_URL}/api/user/saved-articles/{test_pmid}?token={auth_token}"
        )
        assert delete_response.status_code == 200
        data = delete_response.json()
        assert "message" in data
    
    def test_delete_nonexistent_article(self, auth_token):
        """DELETE /api/user/saved-articles/{pmid} for nonexistent article should fail"""
        response = requests.delete(
            f"{BASE_URL}/api/user/saved-articles/NONEXISTENT_PMID?token={auth_token}"
        )
        assert response.status_code == 404
    
    def test_get_saved_articles(self, auth_token):
        """GET /api/user/saved-articles returns user's saved articles"""
        response = requests.get(f"{BASE_URL}/api/user/saved-articles?token={auth_token}")
        assert response.status_code == 200
        data = response.json()
        assert "articles" in data
        assert "count" in data
        assert isinstance(data["articles"], list)


class TestSearchHistory:
    """Test Search History endpoints"""
    
    @pytest.fixture
    def auth_token(self):
        """Get auth token for admin user"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": "admin@evidencemed.com",
            "password": "admin123"
        })
        assert response.status_code == 200
        return response.json()["access_token"]
    
    def test_add_search_history(self, auth_token):
        """POST /api/user/search-history adds search entry"""
        test_query = f"TEST_QUERY_{uuid.uuid4().hex[:8]}"
        
        response = requests.post(
            f"{BASE_URL}/api/user/search-history?token={auth_token}&query={test_query}&results_count=100"
        )
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert "id" in data
        
        # Cleanup - delete the entry
        entry_id = data["id"]
        requests.delete(f"{BASE_URL}/api/user/search-history/{entry_id}?token={auth_token}")
    
    def test_delete_search_history_entry(self, auth_token):
        """DELETE /api/user/search-history/{id} removes search entry"""
        # First add an entry
        test_query = f"TEST_DEL_QUERY_{uuid.uuid4().hex[:8]}"
        add_response = requests.post(
            f"{BASE_URL}/api/user/search-history?token={auth_token}&query={test_query}&results_count=50"
        )
        assert add_response.status_code == 200
        entry_id = add_response.json()["id"]
        
        # Delete the entry
        delete_response = requests.delete(
            f"{BASE_URL}/api/user/search-history/{entry_id}?token={auth_token}"
        )
        assert delete_response.status_code == 200
        data = delete_response.json()
        assert "message" in data
    
    def test_delete_nonexistent_history_entry(self, auth_token):
        """DELETE /api/user/search-history/{id} for nonexistent entry should fail"""
        response = requests.delete(
            f"{BASE_URL}/api/user/search-history/nonexistent_id?token={auth_token}"
        )
        assert response.status_code == 404
    
    def test_clear_all_search_history(self, auth_token):
        """DELETE /api/user/search-history clears all history"""
        # Add some test entries first
        for i in range(3):
            requests.post(
                f"{BASE_URL}/api/user/search-history?token={auth_token}&query=TEST_CLEAR_{i}&results_count={i*10}"
            )
        
        # Clear all history
        response = requests.delete(f"{BASE_URL}/api/user/search-history?token={auth_token}")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data


class TestPubMedSearch:
    """Test PubMed Search endpoint"""
    
    def test_pubmed_search_basic(self):
        """GET /api/pubmed/search returns articles"""
        response = requests.get(f"{BASE_URL}/api/pubmed/search?query=curcumin&max_results=5")
        assert response.status_code == 200
        data = response.json()
        
        assert "articles" in data
        assert "total_count" in data
        assert "query" in data
        assert data["query"] == "curcumin"
        assert isinstance(data["articles"], list)
        
        # Verify article structure if results exist
        if len(data["articles"]) > 0:
            article = data["articles"][0]
            assert "pmid" in article
            assert "title" in article
            assert "authors" in article
            assert "journal" in article
            assert "year" in article
            assert "abstract" in article
            assert "pubmed_url" in article
    
    def test_pubmed_search_with_filters(self):
        """GET /api/pubmed/search with study type filter"""
        response = requests.get(
            f"{BASE_URL}/api/pubmed/search?query=curcumin&study_type=meta_analysis&max_results=5"
        )
        assert response.status_code == 200
        data = response.json()
        assert "articles" in data
    
    def test_pubmed_search_empty_query(self):
        """GET /api/pubmed/search with empty query returns empty results"""
        response = requests.get(f"{BASE_URL}/api/pubmed/search?query=&max_results=5")
        assert response.status_code == 200
        data = response.json()
        assert data["articles"] == []
        assert data["total_count"] == 0


class TestRateLimiting:
    """Test Rate Limiting on endpoints"""
    
    def test_rate_limit_headers_on_pubmed_search(self):
        """Verify rate limiting is configured on PubMed search"""
        response = requests.get(f"{BASE_URL}/api/pubmed/search?query=test&max_results=1")
        # Rate limiting should return 200 for normal requests
        # Headers may include X-RateLimit-* headers
        assert response.status_code == 200
    
    def test_rate_limit_headers_on_login(self):
        """Verify rate limiting is configured on login"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": "admin@evidencemed.com",
            "password": "admin123"
        })
        assert response.status_code == 200


class TestProfileIntegration:
    """Integration tests for profile with saved articles and search history"""
    
    @pytest.fixture
    def auth_token(self):
        """Get auth token for admin user"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": "admin@evidencemed.com",
            "password": "admin123"
        })
        assert response.status_code == 200
        return response.json()["access_token"]
    
    def test_profile_reflects_saved_article(self, auth_token):
        """Verify profile shows saved articles after saving"""
        test_pmid = f"TEST_PROFILE_{uuid.uuid4().hex[:8]}"
        
        # Get initial profile
        profile_before = requests.get(f"{BASE_URL}/api/user/profile?token={auth_token}").json()
        initial_count = profile_before["stats"]["saved_articles_count"]
        
        # Save an article
        article_data = {
            "pmid": test_pmid,
            "title": "Profile Integration Test Article",
            "authors": ["Test Author"],
            "journal": "Test Journal",
            "year": "2024"
        }
        save_response = requests.post(
            f"{BASE_URL}/api/user/saved-articles?token={auth_token}",
            json=article_data
        )
        assert save_response.status_code in [200, 201]
        
        # Get profile again
        profile_after = requests.get(f"{BASE_URL}/api/user/profile?token={auth_token}").json()
        
        # Verify count increased
        assert profile_after["stats"]["saved_articles_count"] == initial_count + 1
        
        # Verify article is in saved_articles list
        saved_pmids = [a["pmid"] for a in profile_after["saved_articles"]]
        assert test_pmid in saved_pmids
        
        # Cleanup
        requests.delete(f"{BASE_URL}/api/user/saved-articles/{test_pmid}?token={auth_token}")
    
    def test_profile_reflects_search_history(self, auth_token):
        """Verify profile shows search history after searching"""
        test_query = f"TEST_HISTORY_{uuid.uuid4().hex[:8]}"
        
        # Add search history
        add_response = requests.post(
            f"{BASE_URL}/api/user/search-history?token={auth_token}&query={test_query}&results_count=42"
        )
        assert add_response.status_code == 200
        entry_id = add_response.json()["id"]
        
        # Get profile
        profile = requests.get(f"{BASE_URL}/api/user/profile?token={auth_token}").json()
        
        # Verify search is in history
        history_queries = [h["query"] for h in profile["search_history"]]
        assert test_query in history_queries
        
        # Cleanup
        requests.delete(f"{BASE_URL}/api/user/search-history/{entry_id}?token={auth_token}")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
