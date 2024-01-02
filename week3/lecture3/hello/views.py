from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
# by returning render you can pass a request and a template (an entire html file)
def index(request):
    return render(request, "hello/index.html")

def dalia(request):
    return HttpResponse("Hello, Dalia!")

def david(request):
    return HttpResponse("Hi, David")

def greet(request, name):
    return render(request, "hello/greet.html", { 
        "name": name.capitalize()
    })
