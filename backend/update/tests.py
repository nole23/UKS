from django.test import TestCase, Client
import json
from datetime import datetime

from users.models import User, Role
from repository.models import Project, Root_Tree, List_Project_User

# Create your tests here.

JSON = 'application/json'
JWT_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2MjI5OTE0Njh9.CkEZ0GwqPYaoBpa9uFIIIWoOYmqO9jGCXnlBQo8JqcA'


def parser_content(data):
    return json.loads(data.decode('UTF-8'))


def get_token():
    c = Client()
    user = {
        "email": "test@gmail.com",
        "password": "123"
    }
    response = c.post(
        '/api/sing-up',
        user,
        HTTP_AUTHORIZATION=JWT_TOKEN,
        content_type=JSON
    )
    JSONdata = parser_content(response.content)
    return JSONdata['data']['jwt']


class UpdateTest(TestCase):
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

        User.objects.create(
            first_name='new',
            last_name='new',
            email='new@gmail.com',
            username='new',
            folder_name='new',
            password='123'
        )
        self.token = get_token()

        role = Role(role_name="O")
        role.save()
        role1 = Role(role_name="C")
        role1.save()
        role2 = Role(role_name="V")
        role2.save()

        Root_Tree.objects.create(
            name_branch='master',
            date_create=datetime.now(),
            user_create=self.userGlobal
        )

        self.projectGlobal = Project.objects.create(
            name="test",
            description="test",
            date_create=datetime.now(),
            type_project=False
        )

        List_Project_User.objects.create(
            project=self.projectGlobal,
            user=self.userGlobal,
            role=role
        )

    def test_get_user(self):
        response = self.c.get(
            '/api/userSearch/new',
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON)
        self.assertEquals(response.status_code, 200)
        self.assertEquals(len(parser_content(response.content)['data']), 1)

    def test_add_user_to_project(self):
        new_user_to_project = {
            "project": 1,
            "user": 2
        }

        response = self.c.put(
            '/api/addUserInProject',
            data=json.dumps(new_user_to_project),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON)
        self.assertEquals(parser_content(response.content)
                          ['message'], "SUCCESS")
        self.assertEquals(response.status_code, 200)

    def test_add_user_to_project_invalid(self):
        new_user_to_project = {
            "project": 1,
            "user": 20
        }

        response = self.c.put(
            '/api/addUserInProject',
            data=json.dumps(new_user_to_project),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON)

        self.assertEqual(response.status_code, 401)

    def test_update_name_project(self):
        new_name_project = {
            "project": 1,
            "name": "newName",
            "type_project": "false"
        }

        response = self.c.put(
            '/api/updateProject',
            data=json.dumps(new_name_project),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON)

        self.assertEquals(response.status_code, 200)

    def test_update_status_project(self):
        new_name_project = {
            "project": 1,
            "name": "test",
            "type_project": "true"
        }

        response = self.c.put(
            '/api/updateProject',
            data=json.dumps(new_name_project),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON)

        self.assertEquals(response.status_code, 200)
