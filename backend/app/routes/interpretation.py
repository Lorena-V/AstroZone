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

from app.schemas.chart import BirthChartRequest
from app.services.astrology_service import calculate_basic_chart


@router.post("/chart")
def calculate_chart(data: BirthChartRequest):
    chart = calculate_basic_chart(
        birth_date=data.birthDate,
        birth_time=data.birthTime,
        lat=data.lat,
        lon=data.lon
    )

    return {
        "name": data.name,
        "gender": data.gender,
        "birthPlace": data.birthPlace,
        "chart": chart
    }