import whisper
import os
from .getDataFromGemini import getResponse


def transcribe_audio(file_path):
    try:
        model = whisper.load_model("base")
        # result = model.transcribe('.\\Videos\\' + file_name)
        result = model.transcribe(file_path)
        print(result["text"])
        return result["text"]
    except Exception as e:
        print(f"Error during transcription: {e}")
        return None

# textOfVideo = transcribe_audio("")
# if textOfVideo != None:
#     print(getResponse('genrate a quiz with 4 options in english using this [Note no question related to vocabulary or language] :' + textOfVideo))
# else:
#     print(textOfVideo)