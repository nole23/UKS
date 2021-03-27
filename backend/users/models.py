from django.db import models

def upload_path(instance, filname):
    return "/".join(["covers", str(instance.user.username), filname])

# Create your models here.
class Role(models.Model):
    ROLES = (
        ('O', 'Owner'),
        ('C', 'Collaborator'),
        ('V', 'Visitor'),
    )
    role_name = models.CharField(max_length=1, choices=ROLES)


class User(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.CharField(max_length=30)
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=30)


class Root_Tree_Project(models.Model):
    name = models.CharField(max_length=150)
    date_create = models.DateTimeField(null=True, blank=True)


class Files(models.Model):
    name = models.CharField(max_length=250)
    cover = models.FileField(blank=True, null=True,
                             upload_to=upload_path)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Tree_List(models.Model):
    id_root = models.ForeignKey(
        Root_Tree_Project, null=True, on_delete=models.CASCADE)
    id_files = models.ForeignKey(Files, null=True, on_delete=models.CASCADE)
    id_children = models.ForeignKey(
        Root_Tree_Project, blank=True, null=True, related_name='children', on_delete=models.CASCADE)


class Project(models.Model):
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=150)
    date_create = models.DateTimeField(null=True, blank=True)
    date_close = models.DateTimeField(null=True, blank=True)
    type_project = models.BooleanField(default=True)
    root_tree_project = models.ForeignKey(
        Root_Tree_Project, on_delete=models.CASCADE)


class List_Project_User(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.CASCADE, null=True)


class Issue(models.Model):
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=150)
    status = models.BooleanField(default=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Issue_Comment(models.Model):
    comment = models.CharField(max_length=150)
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
