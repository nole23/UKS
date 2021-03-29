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


class Files(models.Model):
    name = models.CharField(max_length=250)
    cover = models.FileField(blank=True, null=True, upload_to=upload_path)
    dateCreate = models.DateTimeField(null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Children_Tree(models.Model):
    name_node = models.CharField(max_length=150)
    date_create = models.DateTimeField(null=True, blank=True)
    user_create = models.ForeignKey(User, on_delete=models.CASCADE)
    files = models.ManyToManyField(Files, blank=True)
    children_folder = models.ManyToManyField('self', blank=True)


class Root_Tree(models.Model):
    name_branch = models.CharField(max_length=150)
    date_create = models.DateTimeField(null=True, blank=True)
    user_create = models.ForeignKey(User, on_delete=models.CASCADE)
    files = models.ManyToManyField(Files, blank=True)
    children_folder = models.ManyToManyField(Children_Tree, blank=True)


class Project(models.Model):
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=150)
    date_create = models.DateTimeField(null=True, blank=True)
    date_close = models.DateTimeField(null=True, blank=True)
    type_project = models.BooleanField(default=True)
    root_tree = models.ManyToManyField(Root_Tree, blank=True)


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
