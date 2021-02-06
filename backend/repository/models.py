from django.db import models

# Create your models here.
class Repository(models.Model):
    rep_name = models.CharField(max_length=30)
    link = models.CharField(max_length=30)
