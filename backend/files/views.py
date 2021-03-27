from django.http import JsonResponse
import json
from rest_framework.views import APIView
from django.http import HttpResponse
from django.core.files.base import ContentFile

from users.models import User, Root_Tree_Project, Files, Tree_List
from common import utils


class File(APIView):

    def get(self, request):
        pass

    def post(self, request):
        email = "a@gmail.com"
        user = User.objects.get(email=email)

        parent = request.data['parent']
        types = request.data['type']

        if types == "create":
            title = request.data['title'].split(".")
            text = request.data['text']

            content = ContentFile(text)

            if len(title) > 1:
                content.name = title[0] + "." + title[1]
            else:
                content.name = title[0] + ".txt"

            Files.objects.create(
                name=request.data['title'], cover=content, user=user)

        if types == "upload":
            cover = request.data['cover']
            Files.objects.create(
                name=cover.name, cover=cover, user=user)

        return utils.create_json_response({"message": "SUCCESS"}, status=200)

    def put(self, request):
        pass

    def delete(self, request):
        pass
