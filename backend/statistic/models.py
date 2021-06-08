from django.db import models
from repository.models import Project
from files.models import Files

# Create your models here.


class Statistic(models.Model):
    id = models.AutoField(primary_key=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    files = models.ForeignKey(Files, on_delete=models.CASCADE)
    date_create = models.DateTimeField(null=True, blank=True)
