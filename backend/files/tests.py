from django.test import TestCase, Client
from django.urls import reverse
from django.core.files.base import ContentFile
from rest_framework import status
from http import HTTPStatus

from users.models import Files, User

# Create your tests here.

# inicijalizacija app-i klijenta
client = Client()


class FilesTest(TestCase):
    def setUp(self):
        self.valid_data = {
            'type': 'create',
            'title': 'test',
            'text': 'Test 1 2 3 4',
            'parent': '1'
        }
        User.objects.create(first_name="Dejan", last_name="Jovanović",
                            email="a@gmail.com", username="a", password="123")

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
        response = self.client.post("/api/files", data=self.valid_data)
        self.assertEqual(response.status_code, HTTPStatus.OK)

    def test_post_upload(self):
        response = self.client.post('/api/files', data={
            "cover": open("tests/test_post_upload.txt", "rb"),
            "type": "upload",
            "parent": "1"
        })
        self.assertEqual(response.status_code, HTTPStatus.OK)
