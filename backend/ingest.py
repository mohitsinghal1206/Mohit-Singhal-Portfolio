import os
import re
from pathlib import Path

import tiktoken
from dotenv import load_dotenv
from pinecone import Pinecone


# ============================================================
# CONFIGURATION
# ============================================================

load_dotenv()

PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_INDEX_NAME = os.getenv(
    "PINECONE_INDEX_NAME",
    "mohit-portfolio-rag"
)

PINECONE_NAMESPACE = os.getenv(
    "PINECONE_NAMESPACE",
    "portfolio"
)

KNOWLEDGE_FILE = Path(
    os.getenv(
        "KNOWLEDGE_FILE",
        "../knowledge/mohit.md"
    )
)

CHUNK_SIZE = int(
    os.getenv("CHUNK_SIZE", "300")
)

CHUNK_OVERLAP = int(
    os.getenv("CHUNK_OVERLAP", "50")
)

BATCH_SIZE = int(
    os.getenv("BATCH_SIZE", "50")
)


# ============================================================
# VALIDATION
# ============================================================

if not PINECONE_API_KEY:
    raise ValueError(
        "PINECONE_API_KEY is missing from .env"
    )


if CHUNK_OVERLAP >= CHUNK_SIZE:
    raise ValueError(
        "CHUNK_OVERLAP must be smaller than CHUNK_SIZE"
    )


# ============================================================
# PATH
# ============================================================

BASE_DIR = Path(__file__).resolve().parent

KNOWLEDGE_PATH = (
    BASE_DIR / KNOWLEDGE_FILE
).resolve()


# ============================================================
# TOKENIZER
# ============================================================

encoding = tiktoken.get_encoding(
    "cl100k_base"
)


def count_tokens(text: str) -> int:
    return len(
        encoding.encode(text)
    )


# ============================================================
# MARKDOWN CLEANING
# ============================================================

def clean_markdown(text: str) -> str:
    """
    Normalize unnecessary whitespace while
    preserving Markdown structure.
    """

    text = text.replace(
        "\r\n",
        "\n"
    )

    text = re.sub(
        r"\n{3,}",
        "\n\n",
        text
    )

    text = re.sub(
        r"[ \t]+",
        " ",
        text
    )

    return text.strip()


# ============================================================
# HEADING DETECTION
# ============================================================

def get_heading_level(line: str):
    """
    Returns the Markdown heading level.

    # Heading      -> 1
    ## Heading     -> 2
    ### Heading    -> 3

    Returns None for normal text.
    """

    match = re.match(
        r"^(#{1,6})\s+(.+?)\s*$",
        line
    )

    if not match:
        return None, None

    level = len(
        match.group(1)
    )

    title = match.group(2).strip()

    return level, title


# ============================================================
# MARKDOWN SECTIONS
# ============================================================

def split_into_sections(text: str):
    """
    Split Markdown into heading-aware sections.

    The function does not know anything about
    projects, skills, experience, etc.

    It works with arbitrary Markdown headings.
    """

    lines = text.splitlines()

    sections = []

    current_lines = []
    heading_stack = []

    for line in lines:

        level, title = get_heading_level(line)

        if level is not None:

            # Save previous section
            if current_lines:
                content = "\n".join(
                    current_lines
                ).strip()

                if content:
                    sections.append({
                        "content": content,
                        "heading_path": heading_stack.copy()
                    })

                current_lines = []

            # Remove headings from deeper levels
            heading_stack = [
                item
                for item in heading_stack
                if item["level"] < level
            ]

            heading_stack.append({
                "level": level,
                "title": title
            })

            # Keep heading inside the section
            current_lines.append(line)

        else:
            current_lines.append(line)

    # Save final section
    if current_lines:

        content = "\n".join(
            current_lines
        ).strip()

        if content:
            sections.append({
                "content": content,
                "heading_path": heading_stack.copy()
            })

    return sections


# ============================================================
# LARGE SECTION CHUNKING
# ============================================================

def split_large_section(
    text: str,
    chunk_size: int,
    overlap: int
):
    """
    Token-based splitting for sections that are
    larger than the desired chunk size.
    """

    tokens = encoding.encode(text)

    if len(tokens) <= chunk_size:
        return [text]

    chunks = []

    start = 0

    while start < len(tokens):

        end = min(
            start + chunk_size,
            len(tokens)
        )

        chunk_tokens = tokens[start:end]

        chunk = encoding.decode(
            chunk_tokens
        ).strip()

        if chunk:
            chunks.append(chunk)

        if end >= len(tokens):
            break

        start = end - overlap

    return chunks


# ============================================================
# BUILD RECORDS
# ============================================================

def build_records(text: str):

    sections = split_into_sections(text)

    records = []

    record_number = 1

    for section in sections:

        content = section["content"]

        heading_path = section[
            "heading_path"
        ]

        chunks = split_large_section(
            content,
            CHUNK_SIZE,
            CHUNK_OVERLAP
        )

        for chunk in chunks:

            heading_titles = [
                item["title"]
                for item in heading_path
            ]

            metadata = {
                "source": KNOWLEDGE_PATH.name,
                "heading_path": " > ".join(
                    heading_titles
                ),
                "chunk_number": record_number,
            }

            record = {
                "_id": f"mohit-{record_number}",
                "chunk_text": chunk,
                **metadata,
            }

            records.append(record)

            record_number += 1

    return records


# ============================================================
# PINECONE
# ============================================================

def get_pinecone_index():

    pc = Pinecone(
        api_key=PINECONE_API_KEY
    )

    if not pc.has_index(
        PINECONE_INDEX_NAME
    ):
        raise ValueError(
            f"Pinecone index "
            f"'{PINECONE_INDEX_NAME}' "
            f"does not exist."
        )

    return pc.Index(
        PINECONE_INDEX_NAME
    )


# ============================================================
# UPSERT
# ============================================================

def upsert_records(
    index,
    records
):

    total = len(records)

    for start in range(
        0,
        total,
        BATCH_SIZE
    ):

        batch = records[
            start:start + BATCH_SIZE
        ]

        index.upsert_records(
            namespace=PINECONE_NAMESPACE,
            records=batch
        )

        end = min(
            start + BATCH_SIZE,
            total
        )

        print(
            f"Uploaded {start + 1}-{end} "
            f"of {total}"
        )


# ============================================================
# MAIN INGESTION PIPELINE
# ============================================================

def main():

    print(
        f"Knowledge file: "
        f"{KNOWLEDGE_PATH}"
    )

    if not KNOWLEDGE_PATH.exists():
        raise FileNotFoundError(
            f"Knowledge file not found: "
            f"{KNOWLEDGE_PATH}"
        )

    print("Reading Markdown...")

    text = KNOWLEDGE_PATH.read_text(
        encoding="utf-8"
    )

    text = clean_markdown(text)

    if not text:
        raise ValueError(
            "Knowledge file is empty."
        )

    print("Creating chunks...")

    records = build_records(text)

    print(
        f"Created {len(records)} records."
    )

    print("\nChunk information:")

    for record in records:

        print(
            f"- {record['_id']} | "
            f"{record['heading_path']} | "
            f"{count_tokens(record['chunk_text'])} tokens"
        )

    print("\nConnecting to Pinecone...")

    index = get_pinecone_index()

    print(
        f"Uploading to namespace: "
        f"{PINECONE_NAMESPACE}"
    )

    upsert_records(
        index,
        records
    )

    print(
        "\nIngestion completed successfully."
    )


# ============================================================
# ENTRY POINT
# ============================================================

if __name__ == "__main__":
    main()