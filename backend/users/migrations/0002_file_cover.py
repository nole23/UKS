import users.models
from common import utils
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
                                 upload_to=utils.upload_path),
        ),
    ]
