from django.core.files.storage import default_storage
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics,status

from .models import *
from .functions import *
from rest_framework.views import APIView

# Create your views here.

class getAllContents(APIView):
    def get(self,request):
        return Response([{"uploadedBy":ele.uploadedBy,'title':ele.title,"uploadDate":ele.uploadDate,"thumbnail":ele.thumbnail.url,'videosurl':ele.videos.url,'videospath':ele.videos.path} for ele in uploadedContent.objects.all()],status=status.HTTP_202_ACCEPTED)
    
class postNewData(APIView):
    def post(self,request):
        # uploadedContent.objects.all().delete()
        uplodedBy = request.data.get("username")
        title = request.data.get("title")
        thumb_file = request.FILES['thumbnail']
        uploaded_thumbfile = default_storage.save(f'Thumbnail/{thumb_file.name}', thumb_file)
        video_file = request.FILES['file']
        uploaded_filename = default_storage.save(f'Videos/{video_file.name}', video_file)
        userdata = uploadedContent.objects.create(uploadedBy=uplodedBy,title=title,thumbnail=uploaded_thumbfile,videos=uploaded_filename)
        userdata.save()
        return Response({"msg":"Added Successfully"},status=status.HTTP_202_ACCEPTED)
    
class DeleteAllData(APIView):
    def get(self,request):
        data = uploadedContent.objects.all()
        for content in data:
            default_storage.delete(f'Thumbnail/{content.thumbnail.name}' )
            content.thumbnail.delete(save=False)
            default_storage.delete(f'Video/{content.videos.name}' )
            content.videos.delete(save=False)
        data.delete()
        return Response({"msg":"Removed Successfully"},status=status.HTTP_202_ACCEPTED)