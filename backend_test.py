#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime
import time

class EvidenceMedAPITester:
    def __init__(self, base_url="https://medresearch-4.preview.emergentagent.com"):
        self.base_url = base_url
        self.token = None
        self.user_id = None
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details="", response_data=None):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")
        
        self.test_results.append({
            "test": name,
            "success": success,
            "details": details,
            "response_data": response_data
        })

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/api/{endpoint}"
        test_headers = {'Content-Type': 'application/json'}
        
        if headers:
            test_headers.update(headers)
        
        if self.token and 'Authorization' not in test_headers:
            test_headers['Authorization'] = f'Bearer {self.token}'

        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        print(f"   Method: {method}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=test_headers, timeout=30)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=test_headers, timeout=30)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=test_headers, timeout=30)
            elif method == 'DELETE':
                response = requests.delete(url, headers=test_headers, timeout=30)

            print(f"   Status: {response.status_code}")
            
            # Handle multiple expected status codes
            if isinstance(expected_status, list):
                success = response.status_code in expected_status
            else:
                success = response.status_code == expected_status
                
            response_data = None
            
            try:
                response_data = response.json()
                if success:
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
            except:
                response_data = response.text[:200] if response.text else "No response body"
                print(f"   Response: {response_data}")

            if success:
                self.log_test(name, True, response_data=response_data)
                return True, response_data
            else:
                error_msg = f"Expected {expected_status}, got {response.status_code}"
                if response_data:
                    error_msg += f" - {response_data}"
                self.log_test(name, False, error_msg, response_data)
                return False, response_data

        except Exception as e:
            error_msg = f"Request failed: {str(e)}"
            print(f"   Error: {error_msg}")
            self.log_test(name, False, error_msg)
            return False, {}

    def test_root_endpoint(self):
        """Test API root endpoint"""
        success, response = self.run_test(
            "API Root Endpoint",
            "GET",
            "",
            200
        )
        return success

    def test_user_registration(self):
        """Test user registration"""
        test_email = f"testuser_{int(time.time())}@gmail.com"
        test_password = "testpass123"
        
        success, response = self.run_test(
            "User Registration",
            "POST",
            "auth/register",
            201,
            data={"email": test_email, "password": test_password}
        )
        
        if success and response:
            self.token = response.get('access_token')
            if response.get('user'):
                self.user_id = response['user'].get('id')
            print(f"   Token obtained: {self.token[:20]}..." if self.token else "   No token received")
            print(f"   User ID: {self.user_id}" if self.user_id else "   No user ID received")
        
        return success

    def test_user_login(self):
        """Test user login with provided credentials"""
        # First try to register the test user if it doesn't exist
        register_success, register_response = self.run_test(
            "Register Test User for Login",
            "POST",
            "auth/register",
            [201, 409],  # Accept both success and conflict
            data={"email": "newuser@test.com", "password": "testpass123"}
        )
        
        success, response = self.run_test(
            "User Login (Existing User)",
            "POST",
            "auth/login",
            200,
            data={"email": "newuser@test.com", "password": "testpass123"}
        )
        
        if success and response:
            login_token = response.get('access_token')
            if login_token:
                print(f"   Login token obtained: {login_token[:20]}...")
                # Store this token for other tests if we don't have one
                if not self.token:
                    self.token = login_token
                    if response.get('user'):
                        self.user_id = response['user'].get('id')
        
        return success

    def test_duplicate_registration(self):
        """Test duplicate email registration"""
        # Use the same email that should already exist from login test
        success, response = self.run_test(
            "Duplicate Registration (Should Fail)",
            "POST",
            "auth/register",
            409,  # Expecting conflict
            data={"email": "newuser@test.com", "password": "testpass123"}
        )
        
        # If we got 201, it means the user didn't exist before, which is also valid
        if not success and response and response.get('access_token'):
            print("   ℹ User didn't exist before, registration succeeded (acceptable)")
            return True
            
        return success

    def test_invalid_login(self):
        """Test login with invalid credentials"""
        success, response = self.run_test(
            "Invalid Login (Should Fail)",
            "POST",
            "auth/login",
            401,  # Expecting unauthorized
            data={"email": "invalid@test.com", "password": "wrongpassword"}
        )
        return success

    def test_get_current_user(self):
        """Test getting current user info"""
        if not self.token:
            self.log_test("Get Current User", False, "No token available")
            return False
            
        # Note: The endpoint expects token as query parameter based on the code
        success, response = self.run_test(
            "Get Current User",
            "GET",
            f"auth/me?token={self.token}",
            200
        )
        return success

    def test_pubmed_search_empty(self):
        """Test PubMed search with empty query"""
        success, response = self.run_test(
            "PubMed Search (Empty Query)",
            "GET",
            "pubmed/search?query=",
            200
        )
        
        if success and response:
            if response.get('total_count') == 0 and len(response.get('articles', [])) == 0:
                print("   ✓ Empty query returned empty results as expected")
            else:
                print(f"   ⚠ Empty query returned {response.get('total_count', 0)} results")
        
        return success

    def test_pubmed_search_valid(self):
        """Test PubMed search with valid query"""
        success, response = self.run_test(
            "PubMed Search (Valid Query)",
            "GET",
            "pubmed/search?query=curcumin%20inflammation&max_results=5",
            200
        )
        
        if success and response:
            articles = response.get('articles', [])
            total_count = response.get('total_count', 0)
            print(f"   ✓ Found {len(articles)} articles out of {total_count} total")
            
            if articles:
                first_article = articles[0]
                required_fields = ['pmid', 'title', 'authors', 'journal', 'year', 'abstract', 'pubmed_url']
                missing_fields = [field for field in required_fields if not first_article.get(field)]
                
                if missing_fields:
                    print(f"   ⚠ Missing fields in article: {missing_fields}")
                else:
                    print("   ✓ All required fields present in articles")
                    
                # Check if PubMed URL is valid format
                pubmed_url = first_article.get('pubmed_url', '')
                if 'pubmed.ncbi.nlm.nih.gov' in pubmed_url:
                    print("   ✓ Valid PubMed URL format")
                else:
                    print(f"   ⚠ Invalid PubMed URL format: {pubmed_url}")
        
        return success

    def test_pubmed_search_large_query(self):
        """Test PubMed search with larger result set"""
        success, response = self.run_test(
            "PubMed Search (Large Query)",
            "GET",
            "pubmed/search?query=vitamin%20D&max_results=20",
            200
        )
        
        if success and response:
            articles = response.get('articles', [])
            total_count = response.get('total_count', 0)
            print(f"   ✓ Found {len(articles)} articles out of {total_count} total")
            
            if total_count > 1000:  # Vitamin D should have many results
                print("   ✓ Large result set as expected for popular topic")
            else:
                print(f"   ⚠ Unexpectedly small result set: {total_count}")
        
        return success

    def test_status_endpoints(self):
        """Test status check endpoints"""
        # Test POST status
        success1, response1 = self.run_test(
            "Create Status Check",
            "POST",
            "status",
            200,
            data={"client_name": "test_client"}
        )
        
        # Test GET status
        success2, response2 = self.run_test(
            "Get Status Checks",
            "GET",
            "status",
            200
        )
        
        if success2 and response2:
            if isinstance(response2, list):
                print(f"   ✓ Retrieved {len(response2)} status checks")
            else:
                print("   ⚠ Status checks response is not a list")
        
        return success1 and success2

    def test_institutional_trial_request(self):
        """Test institutional trial request endpoint"""
        trial_data = {
            "institution_name": "Test University Medical Center",
            "institution_type": "university",
            "department": "Integrative Medicine",
            "contact_name": "Dr. Test User",
            "contact_email": "test@university.edu",
            "number_of_users": "11-50",
            "message": "We are interested in institutional access for our research team."
        }
        
        success, response = self.run_test(
            "Institutional Trial Request",
            "POST",
            "institutional/trial-request",
            201,
            data=trial_data
        )
        
        if success and response:
            required_fields = ['id', 'institution_name', 'contact_email', 'status', 'created_at']
            missing_fields = [field for field in required_fields if not response.get(field)]
            
            if missing_fields:
                print(f"   ⚠ Missing fields in response: {missing_fields}")
            else:
                print("   ✓ All required fields present in response")
                
            if response.get('status') == 'pending':
                print("   ✓ Trial request status set to pending")
            else:
                print(f"   ⚠ Unexpected status: {response.get('status')}")
        
        return success

    def test_research_digest_subscription(self):
        """Test research digest subscription endpoint"""
        digest_data = {
            "email": f"digest_test_{int(time.time())}@test.com",
            "frequency": "weekly",
            "topics": ["curcumin", "ashwagandha", "vitamin D"]
        }
        
        success, response = self.run_test(
            "Research Digest Subscription",
            "POST",
            "digest/subscribe",
            201,
            data=digest_data
        )
        
        if success and response:
            required_fields = ['id', 'email', 'frequency', 'topics', 'status', 'created_at']
            missing_fields = [field for field in required_fields if not response.get(field)]
            
            if missing_fields:
                print(f"   ⚠ Missing fields in response: {missing_fields}")
            else:
                print("   ✓ All required fields present in response")
                
            if response.get('status') == 'active':
                print("   ✓ Subscription status set to active")
            else:
                print(f"   ⚠ Unexpected status: {response.get('status')}")
                
            if response.get('frequency') == 'weekly':
                print("   ✓ Frequency set correctly")
            else:
                print(f"   ⚠ Unexpected frequency: {response.get('frequency')}")
        
        return success

    def test_duplicate_digest_subscription(self):
        """Test duplicate digest subscription (should update existing)"""
        # Use same email as previous test
        test_email = "duplicate_test@test.com"
        
        # First subscription
        digest_data1 = {
            "email": test_email,
            "frequency": "weekly",
            "topics": ["curcumin"]
        }
        
        success1, response1 = self.run_test(
            "First Digest Subscription",
            "POST",
            "digest/subscribe",
            201,
            data=digest_data1
        )
        
        # Second subscription with same email (should update)
        digest_data2 = {
            "email": test_email,
            "frequency": "weekly",
            "topics": ["ashwagandha", "vitamin D"]
        }
        
        success2, response2 = self.run_test(
            "Duplicate Digest Subscription (Update)",
            "POST",
            "digest/subscribe",
            201,
            data=digest_data2
        )
        
        if success2 and response2:
            if response2.get('topics') == ["ashwagandha", "vitamin D"]:
                print("   ✓ Topics updated correctly on duplicate subscription")
            else:
                print(f"   ⚠ Topics not updated: {response2.get('topics')}")
        
        return success1 and success2

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting EvidenceMed API Tests")
        print(f"📍 Base URL: {self.base_url}")
        print("=" * 60)
        
        # Basic connectivity
        self.test_root_endpoint()
        
        # Authentication tests
        self.test_user_registration()
        self.test_user_login()
        self.test_duplicate_registration()
        self.test_invalid_login()
        self.test_get_current_user()
        
        # PubMed search tests
        self.test_pubmed_search_empty()
        self.test_pubmed_search_valid()
        self.test_pubmed_search_large_query()
        
        # Status endpoints
        self.test_status_endpoints()
        
        # NEW: Institutional and Digest endpoints
        self.test_institutional_trial_request()
        self.test_research_digest_subscription()
        self.test_duplicate_digest_subscription()
        
        # Print summary
        print("\n" + "=" * 60)
        print(f"📊 Test Summary: {self.tests_passed}/{self.tests_run} tests passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return 0
        else:
            print("❌ Some tests failed!")
            failed_tests = [r for r in self.test_results if not r['success']]
            print("\nFailed tests:")
            for test in failed_tests:
                print(f"  - {test['test']}: {test['details']}")
            return 1

def main():
    tester = EvidenceMedAPITester()
    return tester.run_all_tests()

if __name__ == "__main__":
    sys.exit(main())