import os
import time
import threading
from dotenv import load_dotenv

from langchain_openai import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.prompts import ChatPromptTemplate
from langchain.output_parsers import ResponseSchema, StructuredOutputParser

# Load API key from .env
load_dotenv()
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

# ✅ OpenRouter endpoint (OpenAI-compatible)
llm = ChatOpenAI(
    model="mistralai/mistral-7b-instruct",
    api_key=OPENROUTER_API_KEY,
    base_url="https://openrouter.ai/api/v1",
    temperature=0.7
)

# Conversation memory
memory = ConversationBufferMemory(return_messages=True)

# Define structured schema
response_schemas = [
    ResponseSchema(name="reply", description="Short supportive tutoring reply for the student"),
    ResponseSchema(name="next_step", description="Suggested next action, e.g., 'give example', 'ask quiz', 'repeat concept'")
]

output_parser = StructuredOutputParser.from_response_schemas(response_schemas)

format_instructions = output_parser.get_format_instructions()

# Prompt template with JSON instructions
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are EduVerse, a supportive AI tutor. Always reply in JSON."),
    ("human", "Student said: {text}\nEmotion: {emotion}\n{format_instructions}")
])

def tutor_loop(shared_state, lock, poll_interval=3):
    """
    Tutor loop with JSON-structured responses.
    """
    last_text = ""

    while True:
        time.sleep(poll_interval)

        with lock:
            text = shared_state.get("text", "")
            emotion = shared_state.get("emotion", "neutral")

        if text and text != last_text:
            print(f"[Tutor Agent] New input: {text} ({emotion})")

            try:
                # Build input with format instructions
                input_prompt = prompt.format_messages(
                    text=text,
                    emotion=emotion,
                    format_instructions=format_instructions
                )

                response = llm.invoke(input_prompt)
                parsed = output_parser.parse(response.content)

                reply = parsed.get("reply", "")
                next_step = parsed.get("next_step", "")

                with lock:
                    shared_state["tutor_response"] = reply
                    shared_state["tutor_next_step"] = next_step

                print(f"[Tutor Agent] Reply: {reply}")
                print(f"[Tutor Agent] Next Step: {next_step}")

            except Exception as e:
                with lock:
                    shared_state["tutor_response"] = f"[Error] Tutor agent failed: {e}"
                print(f"[Tutor Agent] Error: {e}")

            last_text = text


# Standalone test
if __name__ == "__main__":
    import threading

    shared_state = {"text": "I don’t understand fractions.", "emotion": "frustrated"}
    lock = threading.Lock()

    tutor_loop(shared_state, lock, poll_interval=0)  # run once
