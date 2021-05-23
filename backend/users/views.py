from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from common.utils import create_json_response, userSerialize
from users.models import User, Role


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


@csrf_exempt
def actions(request, id):
    if request.method == "GET":
        file = open("config/actions.json", "r")
        data = file.read()
        file.close()
        x = '{ "status":"SUCCESS", "description":' + data + ' }'
        y = json.loads(x)
        return JsonResponse(y)


@csrf_exempt
def updateUser(request):
    if request.method == "PUT":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        user = User.objects.get(id=body['id'])

        if user is None:
            return create_json_response({"message": "FALSE", "data": "USER_NOT_FOUNDE"}, status=200)

        user.first_name = body['firstName']
        user.last_name = body['lastName']
        user.username = body['username']

        user.save()

        return create_json_response({"message": "SUCCESS"}, status=200)


@csrf_exempt
def getUserById(request, id):
    user = User.objects.get(id=id)

    return create_json_response({"message": "SUCCESS", "data": userSerialize(user)}, status=200)
