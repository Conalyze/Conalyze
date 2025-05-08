import os
from pdf2image import convert_from_path
from ocr_service import naver_ocr

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def convert_pdf_to_images(pdf_path, poppler_path=None):
    images = convert_from_path(pdf_path, poppler_path=poppler_path)
    saved_paths = []
    for i, image in enumerate(images):
        image_path = os.path.join(UPLOAD_DIR, f"page_{i}.jpg")
        image.save(image_path, "JPEG")
        saved_paths.append(image_path)
    return saved_paths

if __name__ == "__main__":
    test_pdf_path = r"C:\Users\ghdyx\Downloads\캡스톤 디자인 과제 수행일지5.pdf"
    poppler_path = r"C:\Users\ghdyx\Downloads\Release-24.08.0-0\poppler-24.08.0\Library\bin"

    NAVER_CLIENT_ID = "rnjsguswn111@naver.com"
    NAVER_CLIENT_SECRET = "TGhUb1ZPUGJUYWl4a1lYTmNuc2xaem1hRXVXWFpZWmo="

    paths = convert_pdf_to_images(test_pdf_path, poppler_path)

    print("변환 완료. OCR 결과:")
    for path in paths:
        print(f"\n {path}")
        text = naver_ocr(path, NAVER_CLIENT_ID, NAVER_CLIENT_SECRET)
        print(text)
