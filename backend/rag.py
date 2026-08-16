from pathlib import Path
from uuid import uuid4
import json
import time

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from backend.retriever import retrieve, build_context
from backend.generator import generate_answer
from backend.database import SessionLocal, ChatSession
from fastapi.responses import StreamingResponse
from backend.generator import generate_answer_stream

# ============================================================
# CONFIGURATION
# ============================================================

BASE_DIR = Path(__file__).resolve().parent.parent

PROMPT_FILE = BASE_DIR / "knowledge" / "prompt.md"

SYSTEM_PROMPT = PROMPT_FILE.read_text(
    encoding="utf-8"
)


# ============================================================
# FASTAPI
# ============================================================

app = FastAPI(
    title="Mohit Portfolio RAG API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================
# LOAD SESSION
# ============================================================

def get_or_create_session(
    db,
    session_id: str
):
    session = (
        db.query(ChatSession)
        .filter(
            ChatSession.session_id == session_id
        )
        .first()
    )

    if session:
        return session

    session = ChatSession(
        session_id=session_id,
        messages="[]"
    )

    db.add(session)
    db.commit()
    db.refresh(session)

    return session


# ============================================================
# LOAD CONVERSATION
# ============================================================

def load_conversation(session) -> str:

    try:
        messages = json.loads(
            session.messages or "[]"
        )

    except (json.JSONDecodeError, TypeError):

        messages = []

    conversation = ""

    for message in messages:

        message_type = message.get(
            "type",
            "unknown"
        )

        content = message.get(
            "content",
            ""
        )

        if message_type in ["human", "user"]:

            conversation += (
                f"User: {content}\n"
            )

        elif message_type in ["ai", "assistant"]:

            conversation += (
                f"Assistant: {content}\n"
            )

    return conversation


# ============================================================
# SAVE MESSAGE TO SESSION
# ============================================================

def append_message(
    session,
    message_type: str,
    content: str
):

    try:
        messages = json.loads(
            session.messages or "[]"
        )

    except (json.JSONDecodeError, TypeError):

        messages = []

    message_data = {
        "type": message_type,
        "content": content,
        "additional_kwargs": {},
        "response_metadata": {}
    }

    messages.append(message_data)

    session.messages = json.dumps(
        messages,
        ensure_ascii=False
    )


# ============================================================
# RAG PIPELINE
# ============================================================

def ask_mohit(
    query: str,
    session_id: str,
    model: str | None = None
) -> dict:

    total_start = time.perf_counter()

    query = query.strip()

    if not query:
        raise ValueError(
            "Query cannot be empty."
        )

    db = SessionLocal()

    try:

        # ====================================================
        # GET / CREATE SESSION
        # ====================================================

        session = get_or_create_session(
            db,
            session_id
        )

        # ====================================================
        # LOAD CHAT HISTORY
        # ====================================================

        conversation = load_conversation(
            session
        )

        # ====================================================
        # RETRIEVAL
        # ====================================================

        retrieval_start = time.perf_counter()

        results = retrieve(query)

        retrieval_time = (
            time.perf_counter()
            - retrieval_start
        )

        # ====================================================
        # DEBUG RETRIEVAL
        # ====================================================

        print("\n" + "=" * 70)
        print("RETRIEVED RESULTS")
        print("=" * 70)

        if results:

            for i, result in enumerate(
                results,
                1
            ):

                print(
                    f"\n--- Result {i} ---"
                )

                print(
                    f"Score: "
                    f"{result.get('score', 'N/A')}"
                )

                print(
                    f"Section: "
                    f"{result.get('section', 'N/A')}"
                )

                print(
                    f"Text:\n"
                    f"{result.get('text', '')}"
                )

        else:

            print(
                "No relevant results found."
            )

        # ====================================================
        # BUILD RETRIEVED CONTEXT
        # ====================================================

        context = (
            build_context(results)
            if results
            else ""
        )

        # ====================================================
        # BUILD FINAL PROMPT
        # ====================================================

        prompt = SYSTEM_PROMPT.format(
            conversation=conversation,
            context=context,
            query=query
        )

        # ====================================================
        # GENERATE ANSWER
        # ====================================================

        generation_start = time.perf_counter()

        answer = generate_answer(
            query=query,
            context=prompt,
            model=model
        )

        generation_time = (
            time.perf_counter()
            - generation_start
        )

        # ====================================================
        # SAVE USER MESSAGE
        # ====================================================

        append_message(
            session=session,
            message_type="human",
            content=query
        )

        # ====================================================
        # SAVE AI MESSAGE
        # ====================================================

        append_message(
            session=session,
            message_type="ai",
            content=answer
        )

        # ====================================================
        # COMMIT SESSION
        # ====================================================

        db.commit()

        # ====================================================
        # TOTAL TIME
        # ====================================================

        total_time = (
            time.perf_counter()
            - total_start
        )

        return {
            "answer": answer,
            "retrieval_time": retrieval_time,
            "generation_time": generation_time,
            "total_time": total_time
        }

    except Exception:

        db.rollback()
        raise

    finally:

        db.close()


# ============================================================
# API REQUEST MODEL
# ============================================================

class ChatRequest(BaseModel):

    session_id: str | None = None

    message: str

    model: str | None = None


# ============================================================
# CHAT API
# ============================================================

@app.post("/chat")
def chat(request: ChatRequest):

    try:

        # ====================================================
        # GENERATE SESSION ID ONLY FOR NEW CHAT
        # ====================================================

        session_id = (
            request.session_id
            if request.session_id
            else str(uuid4())
        )

        result = ask_mohit(
            query=request.message,
            session_id=session_id,
            model=request.model
        )

        return {
            "session_id": session_id,

            "model": request.model,

            "answer": result["answer"],

            "timing": {
                "retrieval_seconds": round(
                    result["retrieval_time"],
                    3
                ),

                "generation_seconds": round(
                    result["generation_time"],
                    3
                ),

                "total_seconds": round(
                    result["total_time"],
                    3
                )
            }
        }

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )



def ask_mohit_stream(query: str, session_id: str, model: str | None = None):
    query = query.strip()
    if not query:
        raise ValueError("Query cannot be empty.")
    
    db = SessionLocal()
    
    try:
        session = get_or_create_session(db, session_id)
        conversation = load_conversation(session)
        results = retrieve(query)
        context = build_context(results) if results else ""
        prompt = SYSTEM_PROMPT.format(
            conversation=conversation,
            context=context,
            query=query
        )
        
        def generator_wrapper():
            full_answer = ""
            try:
                for chunk in generate_answer_stream(query=query, context=prompt, model=model):
                    full_answer += chunk
                    yield chunk
                
                # Save after completion
                append_message(session=session, message_type="human", content=query)
                append_message(session=session, message_type="ai", content=full_answer)
                db.commit()
            except Exception as e:
                db.rollback()
                raise e
            finally:
                db.close()
                
        return generator_wrapper()
    except Exception as e:
        db.close()
        raise e

@app.post("/chat/stream")
def chat_stream(request: ChatRequest):
    try:
        session_id = request.session_id if request.session_id else str(uuid4())
        return StreamingResponse(
            ask_mohit_stream(query=request.message, session_id=session_id, model=request.model),
            media_type="text/plain"
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health_check():
    try:
        db = SessionLocal()

        try:
            db.execute(text("SELECT 1"))
        finally:
            db.close()

        return {
            "status": "ok",
            "service": "mohit-portfolio-rag",
            "database": "ok"
        }

    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail={
                "status": "unhealthy",
                "service": "mohit-portfolio-rag",
                "database": "unavailable"
            }
        )

# ============================================================
# LOCAL CLI
# ============================================================

if __name__ == "__main__":

    print("=" * 70)
    print("MOHIT PORTFOLIO RAG")
    print("=" * 70)

    # One UUID for the entire CLI conversation
    session_id = str(uuid4())

    print(
        f"\nSession ID: {session_id}"
    )

    print(
        "\nChat history is stored in PostgreSQL."
    )

    print(
        "The same session ID will be used "
        "for every message in this session."
    )

    while True:

        query = input(
            "\nAsk something about Mohit "
            "(type 'exit' to quit): "
        ).strip()

        if query.lower() == "exit":

            print("\nSession ended.")

            break

        if not query:
            continue

        try:

            result = ask_mohit(
                query=query,
                session_id=session_id
            )

            print(
                "\n" + "=" * 70
            )

            print("ANSWER")

            print(
                "=" * 70
            )

            print(
                result["answer"]
            )

            print(
                "\n" + "-" * 70
            )

            print(
                f"Retrieval time:  "
                f"{result['retrieval_time']:.2f} seconds"
            )

            print(
                f"Generation time: "
                f"{result['generation_time']:.2f} seconds"
            )

            print(
                f"Total response time: "
                f"{result['total_time']:.2f} seconds"
            )

            print(
                "-" * 70
            )

        except Exception as e:

            print(
                "\nERROR:"
            )

            print(
                str(e)
            )