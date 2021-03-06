# Generated by Django 3.2.4 on 2021-06-08 19:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '__first__'),
        ('repository', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='Issue',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=30)),
                ('description', models.CharField(max_length=150)),
                ('status', models.BooleanField(default=True)),
                ('date_create', models.DateTimeField(blank=True, null=True)),
                ('labels', models.CharField(max_length=99999, null=True)),
                ('assigned', models.ManyToManyField(blank=True, related_name='assigned', to='users.User')),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='repository.project')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user', to='users.user')),
            ],
        ),
        migrations.CreateModel(
            name='Issue_Comment',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('comment', models.CharField(max_length=150)),
                ('date_create', models.DateTimeField(blank=True, null=True)),
                ('type_comment', models.CharField(default='COMMENT', max_length=150)),
                ('issue', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='issues.issue')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.user')),
            ],
        ),
    ]
