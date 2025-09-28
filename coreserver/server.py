from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import threading
import uvicorn
import asyncio
import json
import sys, os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

# Import your loops
from core.stt.stt import run_stt
from core.emotion.emotion_test import run_emotion
from core.tutor.tutor import tutor_loop

app = FastAPI()

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

shared_state = {
    "text": "",
    "emotion": "neutral",
    "tutor_response": "",
    "tutor_next_step": "",
    "processed": True   # start as True so tutor does nothing until new message
}
lock = threading.Lock()

class AskRequest(BaseModel):
    text: str

@app.get("/state")
async def get_state():
    """Return the current STT + Emotion + Tutor state."""
    with lock:
        return shared_state

@app.post("/ask")
async def ask_tutor(req: AskRequest):
    with lock:
        shared_state["text"] = req.text
        shared_state["processed"] = False  
    return {"status": "ok", "message": "Text received"}

@app.websocket("/ws")
async def websocket_endpoint(ws: WebSocket):
    """Send live updates of shared_state over WebSocket."""
    await ws.accept()
    last_snapshot = {}

    try:
        while True:
            await asyncio.sleep(1)  
            with lock:
                snapshot = shared_state.copy()

            # Only send if there's a change
            if snapshot != last_snapshot:
                await ws.send_text(json.dumps(snapshot))
                last_snapshot = snapshot

                # ✅ Clear tutor response & next_step after sending once
                with lock:
                    shared_state["tutor_response"] = ""
                    shared_state["tutor_next_step"] = ""
    except Exception as e:
        print(f"[WebSocket] Disconnected: {e}")
    finally:
        await ws.close()

def start_background_loops():
    threads = [
        threading.Thread(target=run_stt, args=(shared_state, lock), daemon=True),
        threading.Thread(target=run_emotion, args=(shared_state, 1), daemon=True),
        threading.Thread(target=tutor_loop, args=(shared_state, lock), daemon=True),
    ]
    for t in threads:
        t.start()

if __name__ == "__main__":
    print("🚀 Starting EduVerse server (FastAPI + WS)...")
    start_background_loops()
    uvicorn.run(app, host="0.0.0.0", port=5000)
