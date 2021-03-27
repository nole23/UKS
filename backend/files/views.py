from django.http import JsonResponse
import json
from rest_framework.views import APIView
from django.http import HttpResponse
from django.core.files.base import ContentFile

from users.models import User, Files
from common.utils import token_required_class, create_json_response


class File(APIView):

    # DOTO: Dovesti sve fajlove za jedno cvoriste
    def get(self, request):
        pass

    @token_required_class
    def post(self, request):
        user =  request.user

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

        return create_json_response({"message": "SUCCESS"}, status=200)

    def put(self, request):
        pass

    def delete(self, request):
        pass
