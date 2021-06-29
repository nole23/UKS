from django.db import models


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

    def filter(self, text):
        return User.objects.filter(first_namestartswith=text) | User.objects.filter(last_namestartswith=text) | User.objects.filter(email__startswith=text)
