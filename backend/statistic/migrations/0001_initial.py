# Generated by Django 3.2.4 on 2021-06-08 19:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('files', '0001_initial'),
        ('repository', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Statistic',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('date_create', models.DateTimeField(blank=True, null=True)),
                ('files', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='files.files')),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='repository.project')),
            ],
        ),
    ]