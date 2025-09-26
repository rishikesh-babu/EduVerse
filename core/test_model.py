import pyaudio
from vosk import Model, KaldiRecognizer

# Base directory of this script (core/stt/)
model = Model("C:/EduVerse/core/stt/models/vosk-model-small-en-us-0.4")
recognizer = KaldiRecognizer(model, 16000)

mic = pyaudio.PyAudio()
stream = mic.open(rate=16000, channels=1, format=pyaudio.paInt16,input=True, frames_per_buffer=8192)
stream.start_stream()

while True:
    data = stream.read(4096)

    if recognizer.AcceptWaveform(data):
        print(recognizer.Result())
