import threading
import time


from core.stt.stt import run_stt
from core.emotion.emotion_test import run_emotion
from core.tutor.tutor import tutor_loop

def main():
   
    shared_state = {
        "text": "",
        "emotion": "neutral",
        "tutor_response": "",
        "tutor_next_step": ""
    }
    lock = threading.Lock()

   
    threads = [
        threading.Thread(target=run_stt, args=(shared_state, lock), daemon=True),
        threading.Thread(target=run_emotion, args=(shared_state, lock), daemon=True),
        threading.Thread(target=tutor_loop, args=(shared_state, lock), daemon=True)
    ]


    for t in threads:
        t.start()

    print("🚀 EduVerse is running... (Press Ctrl+C to stop)\n")


    try:
        while True:
            with lock:
                text = shared_state["text"]
                emotion = shared_state["emotion"]
                reply = shared_state["tutor_response"]
                next_step = shared_state["tutor_next_step"]


            if text or reply:
                print(f"\nYou said: {text}")
                print(f"Emotion: {emotion}")
                print(f"Tutor: {reply}")
                print(f"Next Step: {next_step}")

            time.sleep(2)

    except KeyboardInterrupt:
        print("\n🛑 EduVerse stopped.")


if __name__ == "__main__":
    main()
