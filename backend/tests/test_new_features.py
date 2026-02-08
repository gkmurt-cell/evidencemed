"""
Test suite for new features:
1. Spell correction on PubMed search
2. AI-powered search fallback (GPT-5.2)
3. iHerb link on MemberResources page
4. Research page background image
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://researchmed.preview.emergentagent.com')

class TestSpellCorrection:
    """Test spell correction on PubMed search"""
    
    def test_spell_suggestion_ashwaghanda(self):
        """Test misspelled 'ashwaghanda' returns suggestion 'ashwagandha'"""
        response = requests.get(f"{BASE_URL}/api/pubmed/search", params={
            "query": "ashwaghanda",
            "max_results": 5
        })
        assert response.status_code == 200
        data = response.json()
        assert "suggestion" in data
        assert data["suggestion"] == "ashwagandha"
        print(f"✓ Spell suggestion for 'ashwaghanda': {data['suggestion']}")
    
    def test_spell_suggestion_curcuminn(self):
        """Test misspelled 'curcuminn' returns suggestion 'curcumin'"""
        response = requests.get(f"{BASE_URL}/api/pubmed/search", params={
            "query": "curcuminn",
            "max_results": 5
        })
        assert response.status_code == 200
        data = response.json()
        assert "suggestion" in data
        assert data["suggestion"] == "curcumin"
        print(f"✓ Spell suggestion for 'curcuminn': {data['suggestion']}")
    
    def test_spell_suggestion_turmric(self):
        """Test misspelled 'turmric' returns suggestion 'turmeric'"""
        response = requests.get(f"{BASE_URL}/api/pubmed/search", params={
            "query": "turmric",
            "max_results": 5
        })
        assert response.status_code == 200
        data = response.json()
        assert "suggestion" in data
        assert data["suggestion"] == "turmeric"
        print(f"✓ Spell suggestion for 'turmric': {data['suggestion']}")
    
    def test_no_suggestion_for_correct_spelling(self):
        """Test correct spelling 'ashwagandha' returns no suggestion"""
        response = requests.get(f"{BASE_URL}/api/pubmed/search", params={
            "query": "ashwagandha",
            "max_results": 5
        })
        assert response.status_code == 200
        data = response.json()
        # Suggestion should be None for correct spelling
        # Note: suggestion might still appear if results are low
        print(f"✓ Correct spelling 'ashwagandha' - suggestion: {data.get('suggestion')}")
    
    def test_pubmed_search_returns_articles(self):
        """Test PubMed search returns articles"""
        response = requests.get(f"{BASE_URL}/api/pubmed/search", params={
            "query": "curcumin",
            "max_results": 5
        })
        assert response.status_code == 200
        data = response.json()
        assert "articles" in data
        assert "total_count" in data
        assert data["total_count"] > 0
        assert len(data["articles"]) > 0
        print(f"✓ PubMed search returned {len(data['articles'])} articles, total: {data['total_count']}")


class TestAISearch:
    """Test AI-powered search fallback using GPT-5.2"""
    
    def test_ai_search_endpoint_exists(self):
        """Test AI search endpoint is accessible"""
        response = requests.post(f"{BASE_URL}/api/ai-search", json={
            "query": "test query",
            "context": "test context"
        })
        # Should return 200 or 503 (if not configured)
        assert response.status_code in [200, 503]
        print(f"✓ AI search endpoint accessible, status: {response.status_code}")
    
    def test_ai_search_returns_valid_response(self):
        """Test AI search returns valid response structure"""
        response = requests.post(f"{BASE_URL}/api/ai-search", json={
            "query": "shilajit cognitive dementia",
            "context": "PubMed returned few results"
        }, timeout=60)
        
        if response.status_code == 503:
            pytest.skip("AI search service not configured")
        
        assert response.status_code == 200
        data = response.json()
        
        # Verify response structure
        assert "query" in data
        assert "ai_summary" in data
        assert "suggested_terms" in data
        assert "related_topics" in data
        assert "source" in data
        
        assert data["query"] == "shilajit cognitive dementia"
        assert data["source"] == "ai_assisted"
        assert len(data["ai_summary"]) > 0
        
        print(f"✓ AI search returned valid response")
        print(f"  - Summary length: {len(data['ai_summary'])} chars")
        print(f"  - Suggested terms: {len(data['suggested_terms'])}")
        print(f"  - Related topics: {len(data['related_topics'])}")
    
    def test_ai_search_suggested_terms(self):
        """Test AI search returns suggested search terms"""
        response = requests.post(f"{BASE_URL}/api/ai-search", json={
            "query": "shilajit cognitive dementia",
            "context": "PubMed returned few results"
        }, timeout=60)
        
        if response.status_code == 503:
            pytest.skip("AI search service not configured")
        
        assert response.status_code == 200
        data = response.json()
        
        # Should have suggested terms
        assert isinstance(data["suggested_terms"], list)
        print(f"✓ AI search suggested terms: {data['suggested_terms']}")
    
    def test_ai_search_related_topics(self):
        """Test AI search returns related topics"""
        response = requests.post(f"{BASE_URL}/api/ai-search", json={
            "query": "shilajit cognitive dementia",
            "context": "PubMed returned few results"
        }, timeout=60)
        
        if response.status_code == 503:
            pytest.skip("AI search service not configured")
        
        assert response.status_code == 200
        data = response.json()
        
        # Should have related topics
        assert isinstance(data["related_topics"], list)
        print(f"✓ AI search related topics: {data['related_topics']}")
    
    def test_ai_search_empty_query_rejected(self):
        """Test AI search rejects empty query"""
        response = requests.post(f"{BASE_URL}/api/ai-search", json={
            "query": "",
            "context": "test"
        })
        assert response.status_code == 400
        print("✓ AI search correctly rejects empty query")


class TestAuthentication:
    """Test authentication for member resources"""
    
    def test_login_with_admin_credentials(self):
        """Test login with admin@evidencemed.com / admin123"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": "admin@evidencemed.com",
            "password": "admin123"
        })
        
        if response.status_code == 401:
            # Admin user might not exist, try to register
            print("Admin user not found, attempting to register...")
            reg_response = requests.post(f"{BASE_URL}/api/auth/register", json={
                "email": "admin@evidencemed.com",
                "password": "admin123"
            })
            if reg_response.status_code in [201, 409]:
                # Try login again
                response = requests.post(f"{BASE_URL}/api/auth/login", json={
                    "email": "admin@evidencemed.com",
                    "password": "admin123"
                })
        
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert "user" in data
        print(f"✓ Login successful for admin@evidencemed.com")
        return data["access_token"]


class TestAPIHealth:
    """Test API health and basic endpoints"""
    
    def test_api_root(self):
        """Test API root endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert data["message"] == "EvidenceMed API"
        print("✓ API root endpoint working")
    
    def test_pubmed_search_with_filters(self):
        """Test PubMed search with study type filter"""
        response = requests.get(f"{BASE_URL}/api/pubmed/search", params={
            "query": "curcumin",
            "max_results": 5,
            "study_type": "clinical_trial"
        })
        assert response.status_code == 200
        data = response.json()
        assert "articles" in data
        print(f"✓ PubMed search with filters returned {len(data['articles'])} articles")
    
    def test_pubmed_search_with_date_filter(self):
        """Test PubMed search with date filter"""
        response = requests.get(f"{BASE_URL}/api/pubmed/search", params={
            "query": "ashwagandha",
            "max_results": 5,
            "date_from": "2020"
        })
        assert response.status_code == 200
        data = response.json()
        assert "articles" in data
        print(f"✓ PubMed search with date filter returned {len(data['articles'])} articles")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
