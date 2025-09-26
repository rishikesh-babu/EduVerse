import os
import json
import sys
import queue
import sounddevice as sd
from vosk import Model, KaldiRecognizer

MODEL_DIR = os.path.join(os.path.dirname(__file__), "models")
LANG_TO_PATH = {
    "en-in": r"C:\Users\Shane\OneDrive\Desktop\EduVerse\EduVerse\core\stt\models\vosk-model-small-en-in-0.4",
    "en-us": r"C:\Users\Shane\OneDrive\Desktop\EduVerse\EduVerse\core\stt\models\vosk-model-small-en-us-0.15",
    "hi":    r"C:\Users\Shane\OneDrive\Desktop\EduVerse\EduVerse\core\stt\models\vosk-model-small-hi-0.22",
}

SAMPLE_RATE = 16000
BLOCKSIZE = 8000  # bigger block → fewer callbacks

# --------- core engine ----------
def load_model(lang_key: str) -> Model:
    if lang_key not in LANG_TO_PATH:
        raise ValueError(f"Unsupported lang '{lang_key}'. Use one of: {list(LANG_TO_PATH.keys())}")
    path = LANG_TO_PATH[lang_key]
    if not os.path.isdir(path):
        raise FileNotFoundError(f"Model folder not found: {path}")
    print(f"[STT] Loading model: {lang_key} → {path}")
    return Model(model_path=path)

def recognize_stream(model: Model):
    rec = KaldiRecognizer(model, SAMPLE_RATE)
    q = queue.Queue()

    def _callback(indata, frames, time, status):
        if status:
            print("[audio]", status, flush=True)
        q.put(bytes(indata))

    print("You May Speak(Ctrl+C to exit)…")
    with sd.RawInputStream(samplerate=SAMPLE_RATE, blocksize=BLOCKSIZE, dtype="int16",
                           channels=1, callback=_callback):
        while True:
            data = q.get()
            if rec.AcceptWaveform(data):
                res = json.loads(rec.Result())
                text = (res.get("text") or "").strip()
                if text:
                    print(f"You said: {text}")
            else:
                # Optional: show partials while speaking
                # partial = json.loads(rec.PartialResult()).get("partial", "")
                # if partial:
                #     print("...", partial, end="\r")
                pass

# --------- entrypoint ----------
if __name__ == "__main__":
    # Allow language selection via CLI: python stt.py en-in|hi|en-us
    lang = sys.argv[1] if len(sys.argv) > 1 else "en-in"
    try:
        model = load_model(lang)
        recognize_stream(model)
    except Exception as e:
        print("[ERROR]", e)
        print("Usage: python core/stt/stt.py [en-in|hi|en-us]")
        sys.exit(1)