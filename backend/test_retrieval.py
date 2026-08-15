import os

from dotenv import load_dotenv
from pinecone import Pinecone


# --------------------------------------------------
# Configuration
# --------------------------------------------------

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

if not PINECONE_API_KEY:
    raise ValueError(
        "PINECONE_API_KEY is missing from .env"
    )


# --------------------------------------------------
# Pinecone
# --------------------------------------------------

pc = Pinecone(
    api_key=PINECONE_API_KEY
)

if not pc.has_index(INDEX_NAME):
    raise ValueError(
        f"Index '{INDEX_NAME}' does not exist."
    )

index = pc.Index(INDEX_NAME)


# --------------------------------------------------
# Query
# --------------------------------------------------

query = input(
    "\nAsk something about Mohit: "
).strip()

if not query:
    raise ValueError(
        "Query cannot be empty."
    )


# --------------------------------------------------
# Search
# --------------------------------------------------

results = index.search(
    namespace=NAMESPACE,
    query={
        "inputs": {
            "text": query
        },
        "top_k": 5
    }
)


# --------------------------------------------------
# Display results
# --------------------------------------------------

print("\n" + "=" * 70)
print("RETRIEVAL RESULTS")
print("=" * 70)

hits = results["result"]["hits"]

print(f"\nRetrieved {len(hits)} results.")


for i, result in enumerate(hits, start=1):

    print(f"\n--- Result {i} ---")

    # Pinecone search hit can expose values
    # through attributes rather than dictionary keys.

    result_id = getattr(
        result,
        "id",
        None
    )

    score = getattr(
        result,
        "score",
        None
    )

    fields = getattr(
        result,
        "fields",
        None
    )

    # Fallback in case the SDK returns a dict-like object.
    if result_id is None:
        try:
            result_id = result.get("_id")
        except AttributeError:
            pass

    if score is None:
        try:
            score = result.get("_score")
        except AttributeError:
            pass

    if fields is None:
        try:
            fields = result.get("fields", {})
        except AttributeError:
            fields = {}

    if fields is None:
        fields = {}

    # Convert fields to a normal dictionary when possible.
    try:
        fields = dict(fields)
    except (TypeError, ValueError):
        pass

    section = (
        fields.get(
            "heading_path",
            "N/A"
        )
        if hasattr(fields, "get")
        else "N/A"
    )

    chunk_text = (
        fields.get(
            "chunk_text",
            "No text returned"
        )
        if hasattr(fields, "get")
        else "No text returned"
    )

    print(
        f"ID: {result_id}"
    )

    if score is not None:
        print(
            f"Score: {float(score):.4f}"
        )
    else:
        print(
            "Score: N/A"
        )

    print(
        f"Section: {section}"
    )

    print("\nText:")
    print(chunk_text)


print(
    "\n" + "=" * 70
)