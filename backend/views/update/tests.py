from django.test import TestCase, Client
from django.urls import reverse

from users.models import Files, User, Project, Root_Tree

client = Client()

class UpdateTest(TestCase):
    def setUp(self):
        self.data = {
            'name': 'test',
            'description': 'test',
            'type_project': False,
        }
        User.objects.create(first_name="Dejan", last_name="Jovanović", email="d@gmail.com", username="d", password="123")
        User.objects.create(first_name="Novica", last_name="Nikolic", email="n@gmail.com", username="n", password="123")
        User.objects.create(first_name="Jovan", last_name="Popovioc", email="j@gmail.com", username="j", password="123")
        

    def test_get(self):
        response = self.client.get("/api/userSearch/jovan")
        print(response)
        # self.assertEqual(len(response.lists), 2)