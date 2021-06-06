from django.http import response
from django.test import TestCase, Client
import json

from users.models import User

# Create your tests here.

JSON = 'application/json'
JWT_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2MjI5OTE0Njh9.CkEZ0GwqPYaoBpa9uFIIIWoOYmqO9jGCXnlBQo8JqcA'

def parser_content(data):
    return json.loads(data.decode('UTF-8'))

def get_token():
    c = Client()
    user = {
        "email":"test@gmail.com",
        "password":"123"
    }
    response = c.post(
        '/api/sing-up',
        user,
        HTTP_AUTHORIZATION=JWT_TOKEN,
        content_type=JSON
    )
    test = parser_content(response.content)
    return test['data']['jwt']

class TestUser(TestCase):
    c = Client()

    def setUp(self):
        self.userGlobal = User.objects.create(
            first_name='test',
            last_name='test',
            email='test@gmail.com',
            username='test',
            folder_name='test',
            password='123'
        )
        self.token = get_token()
    
    def test_action(self):
        
        response = self.c.get('/api/actions', HTTP_AUTHORIZATION=None, content_type=JSON)
        self.assertEquals(response.status_code, 200)

    def test_add_new_user(self):
        user = {
            "firstName":"test",
            "lastName":"test",
            "email":"test@gmail.com",
            "password":"123"
        }
        response = self.c.post(
            '/api/sing-in', 
            data=json.dumps(user),
            HTTP_AUTHORIZATION=JWT_TOKEN,
            content_type=JSON)
        self.assertEquals(response.status_code, 200)

    def test_login(self):
        self.test_add_new_user()
        user = {
            "email":"test@gmail.com",
            "password":"123"
        }
        response = self.c.post(
            '/api/sing-up', 
            data=json.dumps(user),
            HTTP_AUTHORIZATION=JWT_TOKEN,
            content_type=JSON)
        self.assertEquals(response.status_code, 200)

    def test_get_user_by_id(self):
        response = self.c.get(
            '/api/' + str(self.userGlobal.id),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON)
        self.assertEquals(parser_content(response.content)['message'], "SUCCESS")

    def test_update_user_info(self):
        user = {
            "id": self.userGlobal.id,
            "firstName": self.userGlobal.first_name,
            "lastName": self.userGlobal.last_name,
            "username": "newUsername",
        }
        response = self.c.put(
            '/api/',
            HTTP_AUTHORIZATION=self.token,
            data=json.dumps(user),
            content_type=JSON)
        self.assertEquals(response.status_code, 200)
