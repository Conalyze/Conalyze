import base64
import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()
client_secret = os.getenv("NAVER_CLIENT_SECRET")
def naver_ocr(image_path):
    api_url = "https://d2uh40cad6.apigw.ntruss.com/custom/v1/41345/10cf844a58507323ef39f145b57cf10f44b023638027cd633da2cf157ef42a91/general"

    with open(image_path, "rb") as f:
        image_data = base64.b64encode(f.read()).decode()

    headers = {
        "X-OCR-SECRET": client_secret,
        "Content-Type": "application/json"
    }
    file_ext = os.path.splitext(image_path)[-1].lower().replace('.', '')

    payload = {
        "images": [
            {
                "format": file_ext,
                "name": "sample",
                "data": image_data
            }
        ],
        "requestId": "sample-id",
        "version": "V1",
        "timestamp": 0
    }

    response = requests.post(api_url, headers=headers, data=json.dumps(payload))

    response.raise_for_status()
    result_json = response.json()

    extracted_text = ""
    for image in result_json.get("images", []):
        for field in image.get("fields", []):
            extracted_text += field.get("inferText", "") + "\n"

    return {
        "text": extracted_text.strip(),
        "raw": result_json
    }
