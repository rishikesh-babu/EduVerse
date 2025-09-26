import cv2
import time

def open_camera():
    # Try common indices; CAP_DSHOW helps on Windows
    for idx in [0, 1, 2]:
        cap = cv2.VideoCapture(1, cv2.CAP_DSHOW)
        if cap.isOpened():
            return cap, idx
    return None, None

def main():
    cap, idx = open_camera()
    if cap is None:
        print("❌ No webcam found. Close other apps or check Windows > Privacy > Camera.")
        return

    print(f"✅ Opened webcam index {idx}")
    # Keep it light for laptops
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

    prev = time.time()
    frames = 0
    fps = 0.0

    while True:
        ret, frame = cap.read()
        if not ret:
            print("⚠️ Failed to grab frame")
            break

        frames += 1
        now = time.time()
        if now - prev >= 1.0:
            fps = frames / (now - prev)
            frames = 0
            prev = now

        cv2.putText(frame, f"FPS: {fps:.1f}", (10, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
        cv2.imshow("EduVerse Camera Test (press Q to quit)", frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
