from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def index(request):
    return HttpResponse("Prva poruka. Kreirali smo modele kao i kontrolere. URAAAAA!!!!")