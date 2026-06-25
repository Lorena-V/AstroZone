# Se definen las rutas del backend para interpretar los datos de la carta natal.

# Importación APIRouter de FastAPI para crear un router específico para las rutas 
# de interpretación.
from fastapi import APIRouter
# Importación modelo ChartInput desde el archivo schemas 
# para validar datos de entrada.
from app.schemas.chart import ChartInput

router = APIRouter()

# Ruta de prueba para verificar que el backend está funcionando correctamente.
@router.get("/health")
def health_check():
    return {"status": "ok"}

# Ruta para interpretar los datos de la carta natal, recibe un objeto ChartInput
# y devuelve un mensaje de confirmación junto con los datos recibidos.
@router.post("/interpretation")
def interpretation(data: ChartInput):
    return {
        "message": "El Backend está funcionando wiiii!!!...",
        "data_received": data.model_dump()
    }

# Ruta para calcular la carta natal básica, recibe un objeto BirthChartRequest con
# los datos necesarios para el cálculo y devuelve la carta calculada.
from app.schemas.chart import BirthChartRequest
from app.services.astrology_service import calculo_carta_basica

# Ruta para calcular la carta natal básica, recibe un objeto BirthChartRequest con
# los datos necesarios para el cálculo y devuelve la carta calculada.
@router.post("/chart")
def calculate_chart(data: BirthChartRequest):
    chart = calculo_carta_basica(
        fecha_nacimiento=data.birthDate,
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