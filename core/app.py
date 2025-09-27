import threading
import time

# Import loops from each module
from core.stt.stt import stt_loop
from core.emotion.emotion_test import emotion_loop
from core.tutor.tutor import tutor_loop

def main():
    # Shared state across modules
    shared_state = {
        "text": "",
        "emotion": "neutral",
        "tutor_response": "",
        "tutor_next_step": ""
    }
    lock = threading.Lock()

    # Threads for each module
    threads = [
        threading.Thread(target=stt_loop, args=(shared_state, lock), daemon=True),
        threading.Thread(target=emotion_loop, args=(shared_state, lock), daemon=True),
        threading.Thread(target=tutor_loop, args=(shared_state, lock), daemon=True)
    ]

    # Start all modules
    for t in threads:
        t.start()

    print("🚀 EduVerse is running... (Press Ctrl+C to stop)\n")

    # Monitor loop (console demo)
    try:
        while True:
            with lock:
                text = shared_state["text"]
                emotion = shared_state["emotion"]
                reply = shared_state["tutor_response"]
                next_step = shared_state["tutor_next_step"]

            # Only print if we have something meaningful
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
