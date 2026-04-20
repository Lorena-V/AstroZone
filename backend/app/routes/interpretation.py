from fastapi import APIRouter
from app.schemas.chart import ChartInput

router = APIRouter()

@router.get("/health")
def health_check():
    return {"status": "ok"}

@router.post("/interpretation")
def interpretation(data: ChartInput):
    return {
        "message": "El Backend está funcionando wiiii!!!...",
        "data_received": data.model_dump()
    }