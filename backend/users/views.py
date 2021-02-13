from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from users.models import User
from users.models import Role

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