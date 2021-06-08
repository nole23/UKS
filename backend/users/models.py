from django.db import models


def upload_path(instance, filname):
    splits = filname.split("_")
    link = ""
    index = len(splits)
    count = 0
    for each in splits:
        link += each
        count = count + 1
        if count < index:
            link += "/"
    return "/".join(["covers", link])

# Create your models here.


class Role(models.Model):
    ROLES = (
        ('O', 'Owner'),
        ('C', 'Collaborator'),
        ('V', 'Visitor'),
    )
    id = models.AutoField(primary_key=True)
    role_name = models.CharField(max_length=1, choices=ROLES)

    def get_by_id(self, id):
        return Role.objects.get(id=id)


class User(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.CharField(max_length=30)
    username = models.CharField(max_length=30)
    folder_name = models.CharField(max_length=30)
    password = models.CharField(max_length=30)

    def get_by_email(self, email):
        return User.objects.get(email=email)

    def get_all_by_email(self, email):
        return User.objects.filter(email__exact=email)

    def get_by_id(self, id):
        return User.objects.get(id=id)

    def create_new_user(self, data):
        username = data['email'].split('@')
        username = username[0]

        User.objects.create(
            first_name=data['firstName'],
            last_name=data['lastName'],
            email=data['email'],
            username=username,
            folder_name=username,
            password=data['password']
        )

    def update(self, data):
        data.save()

    # def filter(self, text):
    #     return User.objects.filter(first_namestartswith=text) | User.objects.filter(last_namestartswith=text) | User.objects.filter(email__startswith=text)


class Files(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=250)
    cover = models.FileField(blank=True, null=True, upload_to=upload_path)
    dateCreate = models.DateTimeField(null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


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


class Statistic(models.Model):
    id = models.AutoField(primary_key=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    files = models.ForeignKey(Files, on_delete=models.CASCADE)
    date_create = models.DateTimeField(null=True, blank=True)


class List_Project_User(models.Model):
    id = models.AutoField(primary_key=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.CASCADE, null=True)
