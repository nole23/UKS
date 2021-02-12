from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.

def index(request):
    return HttpResponse("Prva poruka. Kreirali smo modele kao i kontrolere. URAAAAA!!!!")

@csrf_exempt
def registration(request):
    if request.method == "POST":
        x = '{ "status":"SUCCESS"}'
        y = json.loads(x)
        return JsonResponse(y)