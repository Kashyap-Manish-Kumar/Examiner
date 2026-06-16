from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import whisper
import tempfile
import os

import fitz
from fastapi import UploadFile, File

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model once when server starts
model = whisper.load_model("medium")


@app.post("/extract-resume")
async def extract_resume(
    file: UploadFile = File(...)
):
    try:
        pdf_bytes = await file.read()

        doc = fitz.open(
            stream=pdf_bytes,
            filetype="pdf"
        )

        text = ""

        for page in doc:
            text += page.get_text()

        doc.close()

        return {
            "text": text
        }

    except Exception as e:
        return {
            "error": str(e)
        }


@app.post("/transcribe")
async def transcribe(
    file: UploadFile = File(...)
):
    temp_path = None

    try:
        suffix = os.path.splitext(
            file.filename
        )[1] or ".webm"

        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=suffix
        ) as temp:

            temp.write(await file.read())
            temp_path = temp.name

        result = model.transcribe(
            temp_path,
            language="en",
            fp16=False,
        )

        return {
            "text": result["text"].strip()
        }

    finally:
        if temp_path and os.path.exists(temp_path):
            os.remove(temp_path)
            
#uvicorn main:app --reload