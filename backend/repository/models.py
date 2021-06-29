from django.db import models
from datetime import datetime

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

    def createRoot(self, branch, user, files):
        rootTree = Root_Tree.objects.create(
            name_branch=branch,
            date_create=datetime.now(),
            user_create=user
        )
        rootTree.files.add(files)
        return rootTree


class Project(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=150)
    date_create = models.DateTimeField(null=True, blank=True)
    date_close = models.DateTimeField(null=True, blank=True)
    type_project = models.BooleanField(default=True)
    root_tree = models.ManyToManyField(Root_Tree, blank=True)

    def create(self, name, description, type_project, rootTree):
        project = Project.objects.create(
            name=name,
            description=description,
            date_create=datetime.now(),
            type_project=type_project
        )
        project.root_tree.add(rootTree)
        return project

    def get_by_id(self, id):
        return Project.objects.get(id=id)

    def delete(self, id):
        project = Project.objects.get(id=id)
        project.delete()
        return project


class List_Project_User(models.Model):
    id = models.AutoField(primary_key=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.CASCADE, null=True)

    def filter_by_id(self, id):
        return List_Project_User.objects.filter(project_id=id)

    def filter_by_user(self, user):
        return List_Project_User.objects.filter(user=user)

    def filter_by_user_type(self, user, type):
        return List_Project_User.objects.filter(user=user, project__type_project=type)

    def filter_by_name_project(self, user, text):
        return List_Project_User.objects.filter(user=user, project__name__contains=text)

    def create(self, project, user, role):
        List_Project_User.objects.create(
            project=project,
            user=user,
            role=role
        )
