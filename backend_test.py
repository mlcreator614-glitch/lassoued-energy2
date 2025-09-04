#!/usr/bin/env python3
"""
Backend Test Suite for PHP Contact API
Tests the PHP backend running on localhost:8002
"""

import requests
import json
import sqlite3
import os
import time
from datetime import datetime

class PHPBackendTester:
    def __init__(self):
        self.base_url = "http://localhost:8002/api"
        self.db_path = "/app/backend_php/database.sqlite"
        self.test_results = []
        
    def log_test(self, test_name, success, message="", details=None):
        """Log test results"""
        result = {
            'test': test_name,
            'success': success,
            'message': message,
            'details': details,
            'timestamp': datetime.now().isoformat()
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {message}")
        if details:
            print(f"   Details: {details}")
    
    def test_server_connectivity(self):
        """Test if PHP server is responding"""
        try:
            response = requests.get(f"{self.base_url}/contact.php", timeout=5)
            if response.status_code in [200, 405]:  # 405 is expected for GET on POST endpoint
                self.log_test("Server Connectivity", True, "PHP server is responding")
                return True
            else:
                self.log_test("Server Connectivity", False, f"Unexpected status code: {response.status_code}")
                return False
        except requests.exceptions.RequestException as e:
            self.log_test("Server Connectivity", False, f"Connection failed: {str(e)}")
            return False
    
    def test_database_creation(self):
        """Test if SQLite database is created and accessible"""
        try:
            if not os.path.exists(self.db_path):
                self.log_test("Database Creation", False, "Database file does not exist")
                return False
            
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            # Check if contacts table exists
            cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='contacts'")
            table_exists = cursor.fetchone() is not None
            
            if table_exists:
                # Check table structure
                cursor.execute("PRAGMA table_info(contacts)")
                columns = cursor.fetchall()
                expected_columns = ['id', 'nom', 'prenom', 'email', 'telephone', 'entreprise', 'service', 'message', 'urgence', 'created_at']
                actual_columns = [col[1] for col in columns]
                
                missing_columns = [col for col in expected_columns if col not in actual_columns]
                if missing_columns:
                    self.log_test("Database Creation", False, f"Missing columns: {missing_columns}")
                    return False
                else:
                    self.log_test("Database Creation", True, "Database and table structure correct")
                    return True
            else:
                self.log_test("Database Creation", False, "Contacts table does not exist")
                return False
                
        except Exception as e:
            self.log_test("Database Creation", False, f"Database error: {str(e)}")
            return False
        finally:
            if 'conn' in locals():
                conn.close()
    
    def test_valid_contact_submission(self):
        """Test valid contact form submission"""
        test_data = {
            "nom": "Dupont",
            "prenom": "Jean",
            "email": "jean.dupont@example.com",
            "telephone": "0123456789",
            "entreprise": "Test Company",
            "service": "Installation électrique",
            "message": "Je souhaite une installation électrique complète pour ma maison.",
            "urgence": False
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/contact.php",
                json=test_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code == 201:
                response_data = response.json()
                
                # Check required fields in response
                required_fields = ['id', 'nom', 'prenom', 'email', 'telephone', 'service', 'message', 'created_at', 'status']
                missing_fields = [field for field in required_fields if field not in response_data]
                
                if missing_fields:
                    self.log_test("Valid Contact Submission", False, f"Missing response fields: {missing_fields}")
                    return False
                
                # Verify data integrity
                if (response_data['nom'] == test_data['nom'] and 
                    response_data['email'] == test_data['email'] and
                    response_data['service'] == test_data['service']):
                    
                    # Check database persistence
                    if self.verify_database_entry(response_data['id']):
                        self.log_test("Valid Contact Submission", True, "Contact created successfully", 
                                    f"ID: {response_data['id']}, Email sent: {response_data.get('email_sent', 'N/A')}")
                        return True
                    else:
                        self.log_test("Valid Contact Submission", False, "Data not persisted in database")
                        return False
                else:
                    self.log_test("Valid Contact Submission", False, "Response data doesn't match input")
                    return False
            else:
                self.log_test("Valid Contact Submission", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Valid Contact Submission", False, f"Request failed: {str(e)}")
            return False
        except json.JSONDecodeError as e:
            self.log_test("Valid Contact Submission", False, f"Invalid JSON response: {str(e)}")
            return False
    
    def test_urgent_contact_submission(self):
        """Test urgent contact form submission"""
        test_data = {
            "nom": "Martin",
            "prenom": "Sophie",
            "email": "sophie.martin@example.com",
            "telephone": "0987654321",
            "service": "Dépannage électrique urgent",
            "message": "Panne électrique totale, besoin d'intervention immédiate!",
            "urgence": True
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/contact.php",
                json=test_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code == 201:
                response_data = response.json()
                
                if response_data.get('urgence') == True:
                    self.log_test("Urgent Contact Submission", True, "Urgent contact created successfully",
                                f"ID: {response_data['id']}, Urgence: {response_data['urgence']}")
                    return True
                else:
                    self.log_test("Urgent Contact Submission", False, "Urgence flag not properly set")
                    return False
            else:
                self.log_test("Urgent Contact Submission", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Urgent Contact Submission", False, f"Request failed: {str(e)}")
            return False
    
    def test_missing_required_fields(self):
        """Test validation with missing required fields"""
        required_fields = ['nom', 'prenom', 'email', 'telephone', 'service', 'message']
        
        for field in required_fields:
            test_data = {
                "nom": "Test",
                "prenom": "User",
                "email": "test@example.com",
                "telephone": "0123456789",
                "service": "Test Service",
                "message": "Test message"
            }
            
            # Remove the field to test
            del test_data[field]
            
            try:
                response = requests.post(
                    f"{self.base_url}/contact.php",
                    json=test_data,
                    headers={'Content-Type': 'application/json'},
                    timeout=5
                )
                
                if response.status_code == 400:
                    self.log_test(f"Missing Field Validation ({field})", True, "Correctly rejected missing field")
                else:
                    self.log_test(f"Missing Field Validation ({field})", False, 
                                f"Should reject missing {field}, got HTTP {response.status_code}")
                    return False
                    
            except Exception as e:
                self.log_test(f"Missing Field Validation ({field})", False, f"Request failed: {str(e)}")
                return False
        
        return True
    
    def test_invalid_email_validation(self):
        """Test email validation"""
        invalid_emails = ["invalid-email", "test@", "@example.com", "test.example.com"]
        
        for invalid_email in invalid_emails:
            test_data = {
                "nom": "Test",
                "prenom": "User",
                "email": invalid_email,
                "telephone": "0123456789",
                "service": "Test Service",
                "message": "Test message"
            }
            
            try:
                response = requests.post(
                    f"{self.base_url}/contact.php",
                    json=test_data,
                    headers={'Content-Type': 'application/json'},
                    timeout=5
                )
                
                if response.status_code == 400:
                    self.log_test(f"Email Validation ({invalid_email})", True, "Correctly rejected invalid email")
                else:
                    self.log_test(f"Email Validation ({invalid_email})", False, 
                                f"Should reject invalid email, got HTTP {response.status_code}")
                    return False
                    
            except Exception as e:
                self.log_test(f"Email Validation ({invalid_email})", False, f"Request failed: {str(e)}")
                return False
        
        return True
    
    def test_get_contacts_endpoint(self):
        """Test GET endpoint for retrieving contacts"""
        try:
            response = requests.get(f"{self.base_url}/contact.php", timeout=5)
            
            if response.status_code == 200:
                contacts = response.json()
                if isinstance(contacts, list):
                    self.log_test("GET Contacts Endpoint", True, f"Retrieved {len(contacts)} contacts")
                    return True
                else:
                    self.log_test("GET Contacts Endpoint", False, "Response is not a list")
                    return False
            else:
                self.log_test("GET Contacts Endpoint", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("GET Contacts Endpoint", False, f"Request failed: {str(e)}")
            return False
    
    def test_urgent_contacts_endpoint(self):
        """Test GET endpoint for urgent contacts only"""
        try:
            response = requests.get(f"{self.base_url}/contact.php?urgent=true", timeout=5)
            
            if response.status_code == 200:
                contacts = response.json()
                if isinstance(contacts, list):
                    # Check if all returned contacts are urgent
                    non_urgent = [c for c in contacts if not c.get('urgence')]
                    if not non_urgent:
                        self.log_test("GET Urgent Contacts", True, f"Retrieved {len(contacts)} urgent contacts")
                        return True
                    else:
                        self.log_test("GET Urgent Contacts", False, f"Found {len(non_urgent)} non-urgent contacts in urgent filter")
                        return False
                else:
                    self.log_test("GET Urgent Contacts", False, "Response is not a list")
                    return False
            else:
                self.log_test("GET Urgent Contacts", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("GET Urgent Contacts", False, f"Request failed: {str(e)}")
            return False
    
    def verify_database_entry(self, contact_id):
        """Verify that a contact was saved to the database"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            cursor.execute("SELECT * FROM contacts WHERE id = ?", (contact_id,))
            result = cursor.fetchone()
            
            return result is not None
            
        except Exception as e:
            print(f"Database verification error: {str(e)}")
            return False
        finally:
            if 'conn' in locals():
                conn.close()
    
    def test_database_persistence(self):
        """Test that data persists correctly in database"""
        # First create a contact
        test_data = {
            "nom": "Database",
            "prenom": "Test",
            "email": "database.test@example.com",
            "telephone": "0111111111",
            "service": "Test de persistance",
            "message": "Test de sauvegarde en base de données"
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/contact.php",
                json=test_data,
                headers={'Content-Type': 'application/json'},
                timeout=5
            )
            
            if response.status_code == 201:
                response_data = response.json()
                contact_id = response_data['id']
                
                # Verify in database
                conn = sqlite3.connect(self.db_path)
                cursor = conn.cursor()
                
                cursor.execute("SELECT * FROM contacts WHERE id = ?", (contact_id,))
                db_record = cursor.fetchone()
                
                if db_record:
                    # Get column names
                    cursor.execute("PRAGMA table_info(contacts)")
                    columns = [col[1] for col in cursor.fetchall()]
                    
                    # Create dict from record
                    db_data = dict(zip(columns, db_record))
                    
                    # Verify key fields match
                    if (db_data['nom'] == test_data['nom'] and 
                        db_data['email'] == test_data['email'] and
                        db_data['service'] == test_data['service']):
                        self.log_test("Database Persistence", True, "Data correctly persisted to database")
                        return True
                    else:
                        self.log_test("Database Persistence", False, "Data mismatch between API and database")
                        return False
                else:
                    self.log_test("Database Persistence", False, "Contact not found in database")
                    return False
                    
            else:
                self.log_test("Database Persistence", False, f"Failed to create contact: HTTP {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Database Persistence", False, f"Test failed: {str(e)}")
            return False
        finally:
            if 'conn' in locals():
                conn.close()
    
    def run_all_tests(self):
        """Run all backend tests"""
        print("🧪 Starting PHP Backend Test Suite")
        print("=" * 50)
        
        # Core functionality tests
        tests = [
            self.test_server_connectivity,
            self.test_database_creation,
            self.test_valid_contact_submission,
            self.test_urgent_contact_submission,
            self.test_database_persistence,
            self.test_missing_required_fields,
            self.test_invalid_email_validation,
            self.test_get_contacts_endpoint,
            self.test_urgent_contacts_endpoint
        ]
        
        passed = 0
        total = len(tests)
        
        for test in tests:
            try:
                if test():
                    passed += 1
                time.sleep(0.5)  # Small delay between tests
            except Exception as e:
                self.log_test(test.__name__, False, f"Test execution failed: {str(e)}")
        
        print("\n" + "=" * 50)
        print(f"📊 Test Results: {passed}/{total} tests passed")
        
        if passed == total:
            print("🎉 All tests passed! PHP backend is working correctly.")
        else:
            print(f"⚠️  {total - passed} tests failed. Check the details above.")
        
        return passed, total, self.test_results

if __name__ == "__main__":
    tester = PHPBackendTester()
    passed, total, results = tester.run_all_tests()
    
    # Print summary for easy parsing
    print(f"\nSUMMARY: {passed}/{total} tests passed")
    
    # Print failed tests
    failed_tests = [r for r in results if not r['success']]
    if failed_tests:
        print("\nFAILED TESTS:")
        for test in failed_tests:
            print(f"- {test['test']}: {test['message']}")