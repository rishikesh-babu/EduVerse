import cv2
from deepface import DeepFace
from collections import deque, Counter


WEIGHTS = {
    "happy": 0.6,
    "neutral": 0.6,
    "angry": 2.0,
    "sad": 1.8,
    "fear": 1.8,
    "surprise": 1.0,
    
}

CONF_THRESHOLD = 0.5  
history = deque(maxlen=10)  

def remap_emotion(emotion):
    """ Map raw model emotions to EduVerse categories """
    if emotion == "disgust":
        return None  
    elif emotion in ["angry", "fear", "sad"]:
        return "frustrated"
    else:
        return emotion  

def run_emotion(shared_state, cam_index=1):
    cap = cv2.VideoCapture(cam_index, cv2.CAP_DSHOW)

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        frame = cv2.flip(frame, 1)

        try:
            result = DeepFace.analyze(frame, actions=["emotion"], enforce_detection=False)
            emotions = result[0]["emotion"]

            weighted = {emo: prob * WEIGHTS.get(emo, 1.0) for emo, prob in emotions.items()}
            dominant = max(weighted, key=weighted.get)

            if emotions[dominant] >= CONF_THRESHOLD:
                mapped = remap_emotion(dominant)
                if mapped:
                    history.append(mapped)

            stable_emotion = Counter(history).most_common(1)[0][0] if history else "uncertain"
            shared_state["emotion"] = stable_emotion

            cv2.putText(frame, f"Emotion: {stable_emotion}",
                        (50, 50), cv2.FONT_HERSHEY_SIMPLEX,
                        1, (0, 255, 0), 2)

        except Exception as e:
            print("⚠️ Detection error:", e)

        cv2.imshow("EduVerse - Emotion Detection", frame)

        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
