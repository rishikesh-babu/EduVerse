import os
import sys
import pyaudio
from vosk import Model, KaldiRecognizer

# Base directory of this script (core/stt/)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Map languages to model folders
LANG_TO_PATH = {
    "en-in": os.path.join(BASE_DIR, "models", "vosk-model-small-en-in-0.4"),
    "en-us": os.path.join(BASE_DIR, "models", "vosk-model-small-en-us-0.15"),
    "hi":    os.path.join(BASE_DIR, "models", "vosk-model-small-hi-0.22"),
}

def main():
    if len(sys.argv) < 2:
        print("Usage: python stt/stt.py [en-in|hi|en-us]")
        exit(1)

    lang = sys.argv[1]
    if lang not in LANG_TO_PATH:
        print(f"[ERROR] Unsupported language: {lang}")
        exit(1)

    model_path = LANG_TO_PATH[lang]
    print(f"[STT] Loading model: {lang} → {model_path}")

    if not os.path.exists(model_path):
        print("[ERROR] Model path does not exist:", model_path)
        exit(1)

    try:
        model = Model(model_path)
    except Exception as e:
        print("[ERROR] Failed to load model:", e)
        exit(1)

    recognizer = KaldiRecognizer(model, 16000)

    mic = pyaudio.PyAudio()
    stream = mic.open(rate=16000, channels=1, format=pyaudio.paInt16,input=True, frames_per_buffer=8192)
    stream.start_stream()

    print("🎤 Speak (Ctrl+C to exit)...")
    try:
        while True:
            data = stream.read(4096, exception_on_overflow=False)
            if recognizer.AcceptWaveform(data):
                print("[FINAL]", recognizer.Result())

    except KeyboardInterrupt:
        print("\n[INFO] Exiting...")
        stream.stop_stream()
        stream.close()
        mic.terminate()

if __name__ == "__main__":
    main()
