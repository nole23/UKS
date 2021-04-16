from django.test import TestCase, Client
from rest_framework.test import APIClient
from django.urls import reverse
from django.core.files.base import ContentFile
from rest_framework import status
from http import HTTPStatus
from datetime import datetime, timedelta

from users.models import Files, User, Project, Root_Tree

# Create your tests here.
# Create by Dejan
# Editors: [Novica]

# inicijalizacija app-i klijenta


client = Client()
# client.credentials(HTTP_AUTHORIZATION='Token Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2MTcwNDg0OTF9.6NNSwrj50gdykDQc892su46DZrx8C2Oe3tOfISLSd7I')


class FilesTest(TestCase):
    def setUp(self):
        self.valid_data = {
            'type': 'create',
            'title': 'test',
            'text': 'Test 1 2 3 4',
            'parent': '1',
            'folder': '',
            'branch': 'master'
        }

        u = User.objects.create(first_name="Dejan", last_name="Jovanović",
                                email="a@gmail.com", username="a", password="123")
        p = Project.objects.create(
            name="test", description="test", date_create=datetime.now(), type_project=False)
        rt = Root_Tree.objects.create(
            name_branch="master", date_create=datetime.now(), user_create=u)
        p.root_tree.add(rt)

    def test_files_save(self):
        content = ContentFile("Content File")
        content.name = "Content Name"
        user = User.objects.get(username="a")

        a = Files(
            name="Name",
            cover=content,
            user=user
        )
        a.save()

        self.assertEqual(a.name, "Name")

    def test_post(self):

        response = self.client.post("/api/files",  data=self.valid_data)
        self.assertEqual(response.status_code, HTTPStatus.OK)

    def test_post_upload(self):
        response = self.client.post('/api/files', data={
            "cover": open("tests/test_post_upload.txt", "rb"),
            "type": "upload",
            "parent": "1",
            "folder": "",
            "branch": "master"
        })
        self.assertEqual(response.status_code, HTTPStatus.OK)
