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

        title = 'README.md'
        text = 'Generated by GitUKS v1.0.0 on ' + str(datetime.now())
        content = ContentFile(text)
        content.name = self.userGlobal.username + '_name_master_' + title

        files = Files.objects.create(
            name="title",
            cover=content,
            dateCreate=datetime.now(),
            user=self.userGlobal
        )

        rootTree = Root_Tree.objects.create(
            name_branch='master',
            date_create=datetime.now(),
            user_create=self.userGlobal
        )

        rootTree.files.add(files)

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

    def test_add_new_file(self):
        new_file = {
            "type": "create",
            "title": "test",
            "folder": "test",
            "branch": "master",
            "text": "test",
            "parent": "1",
            "tree": "master"
        }

        response = self.c.post(
            '/api/files',
            data=json.dumps(new_file),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON)

        self.assertEquals(response.status_code, 200)

    def test_update_file(self):
        update_file = {
            "id": "1",
            "name": "README.md",
            "cover": "Generated by GitUKS v1.0.0 on 2021-06-08 21:29:11.6128031",
            "dateCreate": "2021-06-08 19:29:11.612803+00:00",
            "user": {"id": "1", "firstName": "test", "lastName": "test", "username": "test"}}

        response = self.c.put(
            '/api/files',
            data=json.dumps(update_file),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON)

        self.assertEquals(response.status_code, 200)

    def test_delete_file(self):
        response = self.c.delete(
            '/api/files/1',
            data=json.dumps({}),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON)

        self.assertEquals(response.status_code, 200)
