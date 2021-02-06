from django.db import models

# Create your models here.
class Role(models.Model):
    ROLES = (
        ('O', 'Owner'),
        ('C', 'Collaborator'),
        ('V', 'Visitor'),
    )
    role_name = models.CharField(max_length=1, choices=ROLES)

class Project(models.Model):
    project_name = models.CharField(max_length=30)

class User(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.CharField(max_length=30)
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=30)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)

class Issue(models.Model):
    issue_name = models.CharField(max_length=30)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Project_User_Role(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    role_on_project = models.ForeignKey(Role, on_delete=models.CASCADE)
