from django.test import TestCase, Client
from datetime import datetime
import json
from django.core.files.base import ContentFile

from users.models import User, Role
from repository.models import Root_Tree, List_Project_User, Project
from files.models import Files

# Create your tests here.
# Create by Dejan
# Editors: [Novica]

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
    test = parser_content(response.content)
    return test['data']['jwt']


class FilesTest(TestCase):
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

        role = Role(role_name="O")
        role.save()

        rootTree = Root_Tree.objects.create(
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

        self.projectGlobal.root_tree.add(rootTree)

        List_Project_User.objects.create(
            project=self.projectGlobal,
            user=self.userGlobal,
            role=role
        )

        rootTree = Root_Tree.objects.create(
            name_branch='master',
            date_create=datetime.now(),
            user_create=self.userGlobal
        )

        self.projectGlobal = Project.objects.create(
            name="test2",
            description="test2",
            date_create=datetime.now(),
            type_project=False
        )

        self.projectGlobal.root_tree.add(rootTree)

        List_Project_User.objects.create(
            project=self.projectGlobal,
            user=self.userGlobal,
            role=role
        )

    def test_get_project_by_id(self):

        response = self.c.get(
            '/api/get-repositpry/2',
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON)
        self.assertEquals(response.status_code, 200)

    def test_create_repository(self):
        new_repo = {
            "type_project":"False",
            "name":"testProject",
            "description":"testDescription"
        }

        response = self.c.post(
            '/api/repository',
            data=json.dumps(new_repo),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON)
        self.assertEquals(response.status_code, 200)

    def test_delete_reposioty(self):
        response = self.c.delete(
            '/api/delete-repository/1',
            data=json.dumps({}),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON)
        #self.assertEquals(response.status_code, 200)

    def test_get_project_by_user(self):
        response = self.c.get(
            '/api/get-all-repository/1',
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON)
        self.assertEquals(response.status_code, 200)

    def test_filter_project(self):
        response = self.c.get(
            '/api/repository/test',
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON)
        self.assertEquals(response.status_code, 200)
