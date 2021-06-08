from django.db import models
from users.models import User, Role
from files.models import Files

# Create your models here.


class Children_Tree(models.Model):
    id = models.AutoField(primary_key=True)
    name_node = models.CharField(max_length=150)
    date_create = models.DateTimeField(null=True, blank=True)
    user_create = models.ForeignKey(User, on_delete=models.CASCADE)
    files = models.ManyToManyField(Files, blank=True)
    children_folder = models.ManyToManyField(
        'self', blank=True, symmetrical=False, related_name='children_tree')


class Root_Tree(models.Model):
    id = models.AutoField(primary_key=True)
    name_branch = models.CharField(max_length=150)
    date_create = models.DateTimeField(null=True, blank=True)
    user_create = models.ForeignKey(User, on_delete=models.CASCADE)
    files = models.ManyToManyField(Files, blank=True)
    children_folder = models.ManyToManyField(Children_Tree, blank=True)


class Project(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=150)
    date_create = models.DateTimeField(null=True, blank=True)
    date_close = models.DateTimeField(null=True, blank=True)
    type_project = models.BooleanField(default=True)
    root_tree = models.ManyToManyField(Root_Tree, blank=True)


class List_Project_User(models.Model):
    id = models.AutoField(primary_key=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.CASCADE, null=True)
