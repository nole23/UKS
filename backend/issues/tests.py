from django.test import TestCase, Client
import json
from datetime import datetime

from users.models import User, Role
from repository.models import Root_Tree, List_Project_User, Project
from issues.models import Issue

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
    test = parser_content(response.content)
    return test['data']['jwt']


class TestIssue(TestCase):
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

        issue = Issue.objects.create(
            name="test",
            description="test",
            project=self.projectGlobal,
            user=self.userGlobal,
            date_create=datetime.now(),
            labels=1
        )

    def test_filter_issues1(self):
        response = self.c.get(
            '/api/filter/status/status/1/1',
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON)

        self.assertEquals(len(parser_content(response.content)['data']), 1)
        self.assertEquals(response.status_code, 200)

    def test_filter_issues2(self):
        response = self.c.get(
            '/api/filter/status/True/author/1',
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON)

        self.assertEquals(response.status_code, 200)

    def test_filter_issues3(self):
        response = self.c.get(
            '/api/filter/status/False/1/1',
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON)
        self.assertEquals(response.status_code, 200)

    def test_create_new_issue(self):
        issue = {
            "name": "test1",
            "description": "test1",
            "id": "1",
            "labels": "null"
        }
        response = self.c.post(
            '/api/add-issue',
            data=json.dumps(issue),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON)
        self.assertEquals(parser_content(response.content)
                          ['data']['name'], "test1")
        self.assertEquals(response.status_code, 200)

    def test_close_issue(self):
        issue = {
            "id": "1",
        }
        response = self.c.put(
            '/api/close-issue',
            data=json.dumps(issue),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON)
        self.assertEquals(parser_content(response.content)[
                          'data']['issue']['name'], "test")
        self.assertEquals(response.status_code, 200)

    def test_close_issue(self):
        issue = {
            "id": "1",
        }
        response = self.c.put(
            '/api/close-issue',
            data=json.dumps(issue),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON)
        self.assertEquals(parser_content(response.content)[
                          'data']['issue']['name'], "test")
        self.assertEquals(response.status_code, 200)

    def test_remove_issue(self):
        issue = {}
        response = self.c.delete(
            '/api/delete-issues/1',
            data=json.dumps(issue),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON)
        self.assertEquals(response.status_code, 200)

    def test_get_issue_by_id(self):
        response = self.c.get(
            '/api/issue/1',
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON)
        self.assertEquals(parser_content(response.content)
                          ['data']['name'], "test")
        self.assertEquals(response.status_code, 200)

    def test_assigned_to_issue(self):
        issue = {
            "id": "1"
        }
        response = self.c.put(
            '/api/assigne-issue',
            data=json.dumps(issue),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON)
        self.assertEquals(parser_content(response.content)[
                          'data']['issue']['name'], "test")
        self.assertEquals(response.status_code, 200)

    def test_create_new_comment(self):
        issue = {
            "id": "1",
            "comment": "testiramo"
        }
        response = self.c.post(
            '/api/add-issue-comment',
            data=json.dumps(issue),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON)
        self.assertEquals(parser_content(response.content)
                          ['data']['comment'], "testiramo")
        self.assertEquals(response.status_code, 200)

    def test_edit_issue(self):
        issue = {
            "id": "1",
            "name": "new name",
            "description": "new description"
        }
        response = self.c.put(
            '/api/update-issue',
            data=json.dumps(issue),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON)
        self.assertEquals(parser_content(response.content)[
                          'data']['issue']['name'], "new name")
        self.assertEquals(response.status_code, 200)
