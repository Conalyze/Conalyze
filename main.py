from fastapi import FastAPI
from routers import upload
from routers.ocr_router import router as ocr_router
from routers import contract_router

app = FastAPI(
    title="Conalyze",
    description=(
        "근로 계약서에서 불법적인 내용이나 포함되지 않은 내용들을 찾아주는 서비스"
    ),
    version="1.0.0"
)

app.include_router(upload.router)
app.include_router(ocr_router)
app.include_router(contract_router.router)
