import os
import time
import threading
import re
import json
from dotenv import load_dotenv

from langchain_openai import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.prompts import ChatPromptTemplate
from langchain.output_parsers import ResponseSchema, StructuredOutputParser

load_dotenv()
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

llm = ChatOpenAI(
    model="mistralai/mistral-7b-instruct",
    api_key=OPENROUTER_API_KEY,
    base_url="https://openrouter.ai/api/v1",
    temperature=0.7
)

memory = ConversationBufferMemory(return_messages=True)

response_schemas = [
    ResponseSchema(name="reply", description="Short supportive tutoring reply for the student"),
    ResponseSchema(name="next_step", description="Suggested next action, e.g., 'give example', 'ask quiz', 'repeat concept'")
]

output_parser = StructuredOutputParser.from_response_schemas(response_schemas)
format_instructions = output_parser.get_format_instructions()

prompt = ChatPromptTemplate.from_template(
    "You are an adaptive tutor.\n"
    "User said: {text}\n"
    "Emotion: {emotion}\n\n"
    "Reply helpfully. Output must be JSON.\n"
    "{format_instructions}"
)

def sanitize_json(raw: str):
    """Try to clean and load JSON safely."""
    raw = raw.strip()

    raw = re.sub(r"^```(json)?", "", raw)
    raw = re.sub(r"```$", "", raw)
    try:
        return json.loads(raw)
    except Exception:
        return {"reply": raw, "next_step": "continue"}

def tutor_loop(shared_state, lock, poll_interval=3):
    while True:
        time.sleep(poll_interval)

        with lock:
            text = shared_state.get("text", "")
            emotion = shared_state.get("emotion", "neutral")
            processed = shared_state.get("processed", False)

        if text and not processed:   # only respond if new and unprocessed
            print(f"[Tutor Agent] New input: {text} ({emotion})")

            try:
                input_prompt = prompt.format_messages(
                    text=text,
                    emotion=emotion,
                    format_instructions=format_instructions
                )
                response = llm.invoke(input_prompt)

                try:
                    parsed = output_parser.parse(response.content)
                except Exception:
                    parsed = sanitize_json(response.content)

                reply = parsed.get("reply", "")
                next_step = parsed.get("next_step", "")

                with lock:
                    shared_state["tutor_response"] = reply
                    shared_state["tutor_next_step"] = next_step
                    shared_state["processed"] = False   # ✅ mark as handled

                print(f"[Tutor Agent] Reply: {reply}")
                print(f"[Tutor Agent] Next Step: {next_step}")

            except Exception as e:
                with lock:
                    shared_state["tutor_response"] = f"[Error] Tutor agent failed: {e}"
                    shared_state["processed"] = True   # avoid retrying same input
                print(f"[Tutor Agent] Error: {e}")


if __name__ == "__main__":
    shared_state = {"text": "I don’t understand fractions.", "emotion": "frustrated"}
    lock = threading.Lock()
    tutor_loop(shared_state, lock, poll_interval=0)
