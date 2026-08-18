from fastapi import FastAPI
from backend.rag import app as inner_app

app = FastAPI()
app.mount("/api", inner_app)
