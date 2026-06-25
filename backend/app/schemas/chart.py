# Este archivo define los modelos de datos para la carta natal
# utilizando Pydantic, que se usará para validar y estructurar los datos de entrada 
# en el backend.

# BaseModel de Pydantic para crear modelos de datos con validación automática
from pydantic import BaseModel
# Optional de typing para campos que no son obligatorios
from typing import Optional

# Modelo para representar los elementos de los signos zodiacales
class Elements(BaseModel):
    sun: str
    moon: str
    asc: str

# Modelo para representar la carta natal básica
class ChartInput(BaseModel):
    name: str
    gender: Optional[str] = None
    solSign: str
    lunaSign: str
    ascSign: str
    elements: Elements

# Este modelo se usará para recibir los datos de entrada para calcular la carta natal
class BirthChartRequest(BaseModel):
    name: str
    birthDate: str
    birthTime: str
    birthPlace: str
    gender: Optional[str] = None
    lat: float
    lon: float