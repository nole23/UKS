import users.models
from users.models import upload_path
from django.db import migrations, models as mode


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='files',
            name='cover',
            field=mode.FileField(blank=True, null=True,
                                 upload_to=upload_path),
        ),
    ]
