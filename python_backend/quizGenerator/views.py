from django.core.files.storage import default_storage
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics,status

from .models import *
from .functions import *
from rest_framework.views import APIView
from .functions import *
from .getDataFromGemini import *
# Create your views here.

class GiveQuiz(APIView):
    def post(self,request):
        path = request.data.get('video_path')
        text = transcribe_audio(path)
        data = ''
        if text != None:
            data = getResponse('genrate a quiz with 4 options in english using this [Note no question related to vocabulary or language] also do not give any extra data requierd then the question and their options and also mention question number and create atleast 7 questions and have it in the list  :' + text)
            # data = getResponse('genrate a quiz with 4 options in english using this [Note no question related to vocabulary or language] also do not give any extra data requierd then the question and their options and also mention question number and create atleast 7 questions and return an list object of python with dictionary where key is question and values are options and anwers and nothing more in the file as i will be assigning this to a list directly and give "!|SepratorForVaraible|!" so that i can use .split method of python to get list  :' + text).split("!|SepratorForVaraible|!")
        else:
            print(text)
        # for ele in data:
        # data = getResponse('genrate a quiz with 4 options in english using this [Note no question related to vocabulary or language] :  ' + text)
        return Response({'quiz':data if data != None else "",'transcript':text.replace('. ','.\n') if text != None else ""},status=status.HTTP_200_OK)