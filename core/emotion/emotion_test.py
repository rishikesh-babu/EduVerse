import cv2
from deepface import DeepFace
from collections import deque, Counter

# Reweight emotions (boost anger/sad for frustration signals)
WEIGHTS = {
    "happy": 0.6,
    "neutral": 0.6,
    "angry": 2.0,
    "sad": 1.8,
    "fear": 1.8,
    "surprise": 1.0,
    # "disgust": 0.0  # ignore disgust completely
}

CONF_THRESHOLD = 0.5  # only accept if confident
history = deque(maxlen=10)  # rolling buffer to smooth flicker

def remap_emotion(emotion):
    """ Map raw model emotions to EduVerse categories """
    if emotion == "disgust":
        return None  # drop it entirely
    elif emotion in ["angry", "fear", "sad"]:
        return "frustrated"
    else:
        return emotion  # happy, neutral, surprise

def main():
    cap = cv2.VideoCapture(1, cv2.CAP_DSHOW)

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # Mirror for natural view
        frame = cv2.flip(frame, 1)

        try:
            result = DeepFace.analyze(frame, actions=["emotion"], enforce_detection=False)
            emotions = result[0]["emotion"]

            # Apply weights
            weighted = {emo: prob * WEIGHTS.get(emo, 1.0) for emo, prob in emotions.items()}
            dominant = max(weighted, key=weighted.get)

            # Confidence check
            if emotions[dominant] >= CONF_THRESHOLD:
                mapped = remap_emotion(dominant)
                if mapped:
                    history.append(mapped)

            # Use smoothed result
            if history:
                stable_emotion = Counter(history).most_common(1)[0][0]
            else:
                stable_emotion = "uncertain"

            # Display
            cv2.putText(frame, f"Emotion: {stable_emotion}",
                        (50, 50), cv2.FONT_HERSHEY_SIMPLEX,
                        1, (0, 255, 0), 2)

        except Exception as e:
            print("⚠️ Detection error:", e)

        cv2.imshow("EduVerse - Emotion Detection (Smoothed)", frame)

        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
