from django.db import models

# Create your models here.

class uploadedContent(models.Model):
    uploadedBy = models.CharField(default="404",max_length=60)
    title = models.CharField(default="Not Available",max_length=100)
    description = models.CharField(default="",max_length=1500)
    uploadDate = models.DateTimeField(auto_now_add=True)
    thumbnail = models.FileField(default=None,upload_to='Thumbnail/')
    videos = models.FileField(default=None,upload_to='Videos/')