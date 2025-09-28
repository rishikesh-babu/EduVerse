import os
import sys
import json
import pyaudio
from vosk import Model, KaldiRecognizer
from langdetect import detect

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

LANG_TO_PATH = {
    "en-in": os.path.join(BASE_DIR, "models", "vosk-model-small-en-in-0.4"),
    "en-us": os.path.join(BASE_DIR, "models", "vosk-model-small-en-us-0.15"),
    "hi":    os.path.join(BASE_DIR, "models", "vosk-model-small-hi-0.22"),
}

def load_model(lang):
    model_path = LANG_TO_PATH.get(lang)
    if not model_path or not os.path.exists(model_path):
        raise ValueError(f"[ERROR] Model not found for {lang}: {model_path}")
    print(f"[STT] Loading model: {lang}")
    return Model(model_path)

def run_stt(shared_state, lock, lang="auto"):
    current_lang = "en-us"
    model = load_model(current_lang)
    recognizer = KaldiRecognizer(model, 16000)

    mic = pyaudio.PyAudio()
    stream = mic.open(rate=16000, channels=1, format=pyaudio.paInt16,
                      input=True, frames_per_buffer=8192)
    stream.start_stream()

    print("I am Listening..... (speak something)")

    samples_for_detection = []
    switched = False
    last_text = ""   # ✅ track last finalized text

    while True:
        data = stream.read(4096, exception_on_overflow=False)
        if recognizer.AcceptWaveform(data):
            result = json.loads(recognizer.Result())
            text = result.get("text", "").strip()
            if not text:
                continue

            # 🔎 Auto language detection once
            if lang == "auto" and not switched:
                samples_for_detection.append(text)
                if len(samples_for_detection) >= 3:  
                    joined = " ".join(samples_for_detection)
                    try:
                        detected = detect(joined)
                        print(f"[LangDetect] Detected language: {detected}")
                        if detected == "hi" and current_lang != "hi":
                            model = load_model("hi")
                            recognizer = KaldiRecognizer(model, 16000)
                            current_lang = "hi"
                            print("🔄 Switched STT to Hindi model")
                        else:
                            print("✅ Keeping English model")
                        switched = True  
                    except Exception as e:
                        print(f"[LangDetect Error] {e}")

            # ✅ Only update if it's different from the last recognized text
            if text != last_text:
                with lock:
                    shared_state["text"] = text
                    shared_state["processed"] = False  
                print(f"[FINAL] {text} | Emotion: {shared_state['emotion']}")
                last_text = text
