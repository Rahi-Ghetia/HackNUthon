# Generated by Django 5.0.4 on 2024-04-21 05:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('uploadedContents', '0004_uploadedcontent_thumbnail_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='uploadedcontent',
            name='description',
            field=models.CharField(default='', max_length=1500),
        ),
    ]
