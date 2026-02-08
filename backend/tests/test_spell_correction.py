"""
Test cases for fuzzy search spell correction feature
Tests the /api/pubmed/search endpoint with misspelled queries
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestSpellCorrection:
    """Test spell correction/fuzzy search functionality"""
    
    def test_misspelled_curcumin_gets_suggestion(self):
        """Test that 'curcuminn' suggests 'curcumin'"""
        response = requests.get(f"{BASE_URL}/api/pubmed/search", params={
            "query": "curcuminn",
            "max_results": 5
        })
        assert response.status_code == 200
        data = response.json()
        assert data["query"] == "curcuminn"
        assert data["suggestion"] == "curcumin"
        print(f"SUCCESS: curcuminn -> suggestion: {data['suggestion']}")
    
    def test_misspelled_ashwagandha_gets_suggestion(self):
        """Test that 'ashwaghanda' suggests 'ashwagandha'"""
        response = requests.get(f"{BASE_URL}/api/pubmed/search", params={
            "query": "ashwaghanda",
            "max_results": 5
        })
        assert response.status_code == 200
        data = response.json()
        assert data["query"] == "ashwaghanda"
        assert data["suggestion"] == "ashwagandha"
        print(f"SUCCESS: ashwaghanda -> suggestion: {data['suggestion']}")
    
    def test_misspelled_turmeric_gets_suggestion(self):
        """Test that 'turmric' suggests 'turmeric'"""
        response = requests.get(f"{BASE_URL}/api/pubmed/search", params={
            "query": "turmric",
            "max_results": 5
        })
        assert response.status_code == 200
        data = response.json()
        assert data["query"] == "turmric"
        assert data["suggestion"] == "turmeric"
        print(f"SUCCESS: turmric -> suggestion: {data['suggestion']}")
    
    def test_misspelled_ginseng_gets_suggestion(self):
        """Test that 'ginsng' suggests 'ginseng'"""
        response = requests.get(f"{BASE_URL}/api/pubmed/search", params={
            "query": "ginsng",
            "max_results": 5
        })
        assert response.status_code == 200
        data = response.json()
        assert data["query"] == "ginsng"
        assert data["suggestion"] == "ginseng"
        print(f"SUCCESS: ginsng -> suggestion: {data['suggestion']}")
    
    def test_correct_spelling_no_suggestion(self):
        """Test that correctly spelled 'curcumin' has no suggestion"""
        response = requests.get(f"{BASE_URL}/api/pubmed/search", params={
            "query": "curcumin",
            "max_results": 5
        })
        assert response.status_code == 200
        data = response.json()
        assert data["query"] == "curcumin"
        # Suggestion should be None for correct spelling with many results
        assert data["suggestion"] is None
        print(f"SUCCESS: curcumin (correct) -> no suggestion")
    
    def test_correct_spelling_ashwagandha_no_suggestion(self):
        """Test that correctly spelled 'ashwagandha' has no suggestion"""
        response = requests.get(f"{BASE_URL}/api/pubmed/search", params={
            "query": "ashwagandha",
            "max_results": 5
        })
        assert response.status_code == 200
        data = response.json()
        assert data["query"] == "ashwagandha"
        assert data["suggestion"] is None
        print(f"SUCCESS: ashwagandha (correct) -> no suggestion")
    
    def test_search_response_structure(self):
        """Test that search response has correct structure including suggestion field"""
        response = requests.get(f"{BASE_URL}/api/pubmed/search", params={
            "query": "curcumin",
            "max_results": 5
        })
        assert response.status_code == 200
        data = response.json()
        
        # Check required fields
        assert "articles" in data
        assert "total_count" in data
        assert "query" in data
        assert "suggestion" in data  # New field for spell correction
        
        # Check articles structure
        if data["articles"]:
            article = data["articles"][0]
            assert "pmid" in article
            assert "title" in article
            assert "authors" in article
            assert "journal" in article
            assert "year" in article
            assert "abstract" in article
            assert "pubmed_url" in article
        
        print(f"SUCCESS: Response structure is correct with suggestion field")
    
    def test_empty_query_no_suggestion(self):
        """Test that empty query returns no suggestion"""
        response = requests.get(f"{BASE_URL}/api/pubmed/search", params={
            "query": "",
            "max_results": 5
        })
        assert response.status_code == 200
        data = response.json()
        assert data["articles"] == []
        assert data["total_count"] == 0
        assert data["suggestion"] is None
        print(f"SUCCESS: Empty query returns no suggestion")
    
    def test_short_query_no_suggestion(self):
        """Test that very short queries don't get suggestions"""
        response = requests.get(f"{BASE_URL}/api/pubmed/search", params={
            "query": "ab",
            "max_results": 5
        })
        assert response.status_code == 200
        data = response.json()
        # Short queries (< 3 chars) should not get suggestions
        assert data["suggestion"] is None
        print(f"SUCCESS: Short query 'ab' returns no suggestion")


class TestPubMedSearchWithFilters:
    """Test PubMed search with filters still works"""
    
    def test_search_with_study_type_filter(self):
        """Test search with study type filter"""
        response = requests.get(f"{BASE_URL}/api/pubmed/search", params={
            "query": "curcumin",
            "max_results": 5,
            "study_type": "clinical_trial"
        })
        assert response.status_code == 200
        data = response.json()
        assert "articles" in data
        print(f"SUCCESS: Search with study_type filter works, got {len(data['articles'])} articles")
    
    def test_search_with_date_filter(self):
        """Test search with date filter"""
        response = requests.get(f"{BASE_URL}/api/pubmed/search", params={
            "query": "curcumin",
            "max_results": 5,
            "date_from": "2020",
            "date_to": "2024"
        })
        assert response.status_code == 200
        data = response.json()
        assert "articles" in data
        print(f"SUCCESS: Search with date filter works, got {len(data['articles'])} articles")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
