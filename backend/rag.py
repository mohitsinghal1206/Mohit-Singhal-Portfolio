from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import time
from pathlib import Path
from retriever import retrieve, build_context
from generator import generate_answer


app = FastAPI(
    title="Mohit Portfolio RAG API",
    version="1.0.0"
)

BASE_DIR = Path(__file__).resolve().parent.parent
PROMPT_FILE = BASE_DIR / "knowledge" / "prompt.md"

SYSTEM_PROMPT = PROMPT_FILE.read_text(
    encoding="utf-8"
)


# ============================================================
# SESSION CHAT HISTORY
# ============================================================

chat_sessions = {}


# ============================================================
# REQUEST MODEL
# ============================================================

class ChatRequest(BaseModel):
    session_id: str
    message: str
    model: str | None = None


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
        raise ValueError("Query cannot be empty.")

    # --------------------------------------------------------
    # Create session if it doesn't exist
    # --------------------------------------------------------

    if session_id not in chat_sessions:
        chat_sessions[session_id] = []

    history = chat_sessions[session_id]

    # --------------------------------------------------------
    # Build conversation history
    # --------------------------------------------------------

    conversation = ""

    for message in history:
        conversation += (
            f"{message['role'].capitalize()}: "
            f"{message['content']}\n"
        )

    # --------------------------------------------------------
    # Retrieve knowledge from Pinecone
    # --------------------------------------------------------

    retrieval_start = time.perf_counter()

    results = retrieve(query)
    print("\n" + "=" * 70)
    print("RETRIEVED RESULTS")
    print("=" * 70)

    for i, result in enumerate(results, 1):
        print(f"\n--- Result {i} ---")
        print(f"Score: {result.get('score', 'N/A')}")
        print(f"Section: {result.get('section', 'N/A')}")
        print(f"Text:\n{result.get('text', '')}")

    retrieval_time = time.perf_counter() - retrieval_start

    # --------------------------------------------------------
    # Build retrieved context
    # --------------------------------------------------------

    context = build_context(results) if results else ""

    # --------------------------------------------------------
    # Build final prompt
    # --------------------------------------------------------

    prompt = SYSTEM_PROMPT.format(
    conversation=conversation,
    context=context,
    query=query
)

    # --------------------------------------------------------
    # Generate answer
    # --------------------------------------------------------

    generation_start = time.perf_counter()

    answer = generate_answer(
        query=query,
        context=prompt,
        model=model
    )

    generation_time = time.perf_counter() - generation_start

    # --------------------------------------------------------
    # Save conversation
    # --------------------------------------------------------

    history.append({
        "role": "user",
        "content": query
    })

    history.append({
        "role": "assistant",
        "content": answer
    })

    # --------------------------------------------------------
    # Total time
    # --------------------------------------------------------

    total_time = time.perf_counter() - total_start

    return {
        "answer": answer,
        "retrieval_time": retrieval_time,
        "generation_time": generation_time,
        "total_time": total_time
    }

# ============================================================
# API ENDPOINT
# ============================================================

@app.post("/chat")
def chat(request: ChatRequest):

    try:

        result = ask_mohit(
            query=request.message,
            session_id=request.session_id,
            model=request.model
        )

        return {
            "session_id": request.session_id,
            "model": request.model,
            "answer": result["answer"],
            "timing": {
                "retrieval_seconds": round(
                    result["retrieval_time"], 3
                ),
                "generation_seconds": round(
                    result["generation_time"], 3
                ),
                "total_seconds": round(
                    result["total_time"], 3
                )
            }
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# ============================================================
# LOCAL TEST
# ============================================================

if __name__ == "__main__":

    print("=" * 70)
    print("MOHIT PORTFOLIO RAG")
    print("=" * 70)

    session_id = "local-test"

    while True:

        query = input(
            "\nAsk something about Mohit "
            "(type 'exit' to quit): "
        ).strip()

        if query.lower() == "exit":
            break

        result = ask_mohit(
            query=query,
            session_id=session_id
        )

        print("\n" + "=" * 70)
        print("ANSWER")
        print("=" * 70)

        print(result["answer"])

        print("\n" + "-" * 70)
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
        print("-" * 70)