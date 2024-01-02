# Create a list of all the urls that can be accessed 
# To create a url you must import path from django.urls
# from . import views is to reference the views.py file

from django.urls import path 
from . import views 
urlpatterns = [
    path("", views.index, name="index"),
    path("dalia", views.dalia, name="dalia"),
    path("david", views.david, name="david"),
    path("<str:name>", views.greet, name ="greet")
]