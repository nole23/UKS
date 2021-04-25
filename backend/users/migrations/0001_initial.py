# Generated by Django 3.2 on 2021-04-25 22:29

from django.db import migrations, models
import django.db.models.deletion
import users.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Children_Tree',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name_node', models.CharField(max_length=150)),
                ('date_create', models.DateTimeField(blank=True, null=True)),
                ('children_folder', models.ManyToManyField(blank=True, related_name='children_tree', to='users.Children_Tree')),
            ],
        ),
        migrations.CreateModel(
            name='Files',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250)),
                ('cover', models.FileField(blank=True, null=True, upload_to=users.models.upload_path)),
                ('dateCreate', models.DateTimeField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Issue',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('description', models.CharField(max_length=150)),
                ('status', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='Role',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('role_name', models.CharField(choices=[('O', 'Owner'), ('C', 'Collaborator'), ('V', 'Visitor')], max_length=1)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=30)),
                ('last_name', models.CharField(max_length=30)),
                ('email', models.CharField(max_length=30)),
                ('username', models.CharField(max_length=30)),
                ('password', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Root_Tree',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name_branch', models.CharField(max_length=150)),
                ('date_create', models.DateTimeField(blank=True, null=True)),
                ('children_folder', models.ManyToManyField(blank=True, to='users.Children_Tree')),
                ('files', models.ManyToManyField(blank=True, to='users.Files')),
                ('user_create', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.user')),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('description', models.CharField(max_length=150)),
                ('date_create', models.DateTimeField(blank=True, null=True)),
                ('date_close', models.DateTimeField(blank=True, null=True)),
                ('type_project', models.BooleanField(default=True)),
                ('root_tree', models.ManyToManyField(blank=True, to='users.Root_Tree')),
            ],
        ),
        migrations.CreateModel(
            name='List_Project_User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.project')),
                ('role', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='users.role')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.user')),
            ],
        ),
        migrations.CreateModel(
            name='Issue_Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.CharField(max_length=150)),
                ('issue', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.issue')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.user')),
            ],
        ),
        migrations.AddField(
            model_name='issue',
            name='project',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.project'),
        ),
        migrations.AddField(
            model_name='issue',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.user'),
        ),
        migrations.AddField(
            model_name='files',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.user'),
        ),
        migrations.AddField(
            model_name='children_tree',
            name='files',
            field=models.ManyToManyField(blank=True, to='users.Files'),
        ),
        migrations.AddField(
            model_name='children_tree',
            name='user_create',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.user'),
        ),
    ]
