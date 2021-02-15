from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from users.models import User
from users.models import Role
from datetime import datetime, timedelta
import jwt

JWT_SECRET = 'secret'
JWT_ALGORITHM = 'HS256'
JWT_EXP_DELTA_SECONDS = 3600


# Create your views here.

def index(request):
    return HttpResponse("Prva poruka. Kreirali smo modele kao i kontrolere. URAAAAA!!!!")

@csrf_exempt
def registration(request):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        username = body['email'].split('@')
        username = username[0]

        role = Role.objects.get(id=1)

        print(role)
        
        p = User(first_name=body['firstName'], last_name=body['lastName'], email=body['email'], username=username, password=body['password'], role=role)

        p.save()

        x = '{ "status":"SUCCESS"}'
        y = json.loads(x)
        return JsonResponse(y)

@csrf_exempt
def login(request):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        email = body['email']
        password = body['password']
        x = ''

        user = User.objects.get(email=email)
        if user.password != password:
            print(2)
            x = '{ "status":false }'
            y = json.loads(x)
            return JsonResponse(y)

        payload = {
            'user_id': user.id,
            'exp': datetime.utcnow() + timedelta(seconds=JWT_EXP_DELTA_SECONDS)
        }
        jwt_token = jwt.encode(payload, JWT_SECRET, JWT_ALGORITHM)
        firstName = user.first_name
        lastName = user.last_name
        email = user.email
        role = user.role.role_name
        x ='{ "status":true, "user":{"firstName":"' + user.first_name + '", "lastName":"' + user.last_name + '", "role":"' + user.role.role_name + '"}, "jwt":"' + jwt_token + '"}'   
        y = json.loads(x)
        return JsonResponse(y)