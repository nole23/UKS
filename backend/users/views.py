from django.http import JsonResponse
from rest_framework.views import APIView
import json

from common.utils import create_json_response, userSerialize, decode_body
from users.models import Role
from users.service import UserService


def index(request):
    role1 = Role(role_name="O")
    role2 = Role(role_name="C")
    role3 = Role(role_name="V")

    role1.save()
    role2.save()
    role3.save()

    x = '{ "status":"SUCCESS", "message":"Server successfully started."}'
    y = json.loads(x)
    return JsonResponse(y)

def action(request):
    file = open("config/actions.json", "r")
    data = file.read()
    file.close()
    x = '{ "status":"SUCCESS", "description":' + data + ' }'
    y = json.loads(x)
    return JsonResponse(y)


class User(APIView):
    user = UserService()

    def get(self, request, id):
        user = self.user.getUserById(id)
        return create_json_response({"message": "SUCCESS", "data": userSerialize(user)}, status=200)

    def put(self, request):
        data = decode_body(request.body)

        user = self.user.update(data)
        return create_json_response({"message": user['message'], "data": user['data']}, status=200)


class Login(APIView):
    user = UserService()

    def post(self, request):

        data = decode_body(request.body)
        login = self.user.login(data)

        return create_json_response({"message": login['message'], "data": login['data']}, status=200)

class Registration(APIView):
    user = UserService()

    def post(self, request):

        data = decode_body(request.body)
        registration = self.user.create(data)

        return create_json_response({"message": registration['message'], "data": registration['data']}, status=200)
