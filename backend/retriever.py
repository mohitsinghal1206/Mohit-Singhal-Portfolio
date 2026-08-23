import os

from dotenv import load_dotenv
from pinecone import Pinecone
from langsmith import traceable

# ============================================================
# Configuration
# ============================================================

load_dotenv()

PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")

INDEX_NAME = os.getenv(
    "PINECONE_INDEX_NAME",
    "mohit-portfolio-rag"
)

NAMESPACE = os.getenv(
    "PINECONE_NAMESPACE",
    "portfolio"
)

TOP_K = int(
    os.getenv("TOP_K", "5")
)


# ============================================================
# Validation
# ============================================================

if not PINECONE_API_KEY:
    raise ValueError(
        "PINECONE_API_KEY is missing from .env"
    )


# ============================================================
# Pinecone connection
# ============================================================

pc = Pinecone(
    api_key=PINECONE_API_KEY
)

if not pc.has_index(INDEX_NAME):
    raise ValueError(
        f"Pinecone index '{INDEX_NAME}' does not exist."
    )

index = pc.Index(INDEX_NAME)


# ============================================================
# Retrieval
# ============================================================

@traceable(name="Pinecone Retrieval", run_type="retriever")
def retrieve(
    query: str,
    top_k: int = TOP_K
) -> list[dict]:
    """
    Retrieve the most relevant knowledge chunks
    from Pinecone using integrated embeddings.
    """

    query = query.strip()

    if not query:
        return []

    results = index.search(
        namespace=NAMESPACE,
        query={
            "inputs": {
                "text": query
            },
            "top_k": top_k
        }
    )

    hits = results["result"]["hits"]

    retrieved_chunks = []

    for hit in hits:

        result_id = getattr(
            hit,
            "id",
            None
        )

        score = getattr(
            hit,
            "score",
            None
        )

        fields = getattr(
            hit,
            "fields",
            {}
        )

        if fields is None:
            fields = {}

        try:
            fields = dict(fields)
        except (TypeError, ValueError):
            fields = {}

        retrieved_chunks.append({
            "id": result_id,
            "score": float(score)
            if score is not None
            else None,
            "text": fields.get(
                "chunk_text",
                ""
            ),
            "section": fields.get(
                "heading_path",
                ""
            ),
            "source": fields.get(
                "source",
                ""
            )
        })

    return retrieved_chunks


# ============================================================
# Context builder
# ============================================================

def build_context(
    chunks: list[dict]
) -> str:
    """
    Convert retrieved chunks into clean context
    that will later be passed to the LLM.
    """

    context_parts = []

    for i, chunk in enumerate(
        chunks,
        start=1
    ):

        section = chunk.get(
            "section",
            ""
        )

        text = chunk.get(
            "text",
            ""
        )

        if not text:
            continue

        context_parts.append(
            f"[Context {i}]\n"
            f"Section: {section}\n"
            f"{text}"
        )

    return "\n\n".join(
        context_parts
    )


# ============================================================
# CLI test
# ============================================================

if __name__ == "__main__":

    query = input(
        "\nAsk something about Mohit: "
    ).strip()

    chunks = retrieve(query)

    print(
        "\n" + "=" * 70
    )
    print("RETRIEVED CONTEXT")
    print(
        "=" * 70
    )

    for i, chunk in enumerate(
        chunks,
        start=1
    ):

        print(
            f"\n--- Context {i} ---"
        )

        print(
            f"ID: {chunk['id']}"
        )

        print(
            f"Score: {chunk['score']}"
        )

        print(
            f"Section: {chunk['section']}"
        )

        print("\nText:")
        print(
            chunk["text"]
        )

    print(
        "\n" + "=" * 70
    )

    context = build_context(chunks)

    print(
        "\nCLEAN CONTEXT FOR LLM:"
    )
    print(
        "=" * 70
    )
    print(context)