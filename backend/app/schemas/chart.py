from pydantic import BaseModel
from typing import Optional

class Elements(BaseModel):
    sun: str
    moon: str
    asc: str

class ChartInput(BaseModel):
    name: str
    gender: Optional[str] = None
    sunSign: str
    moonSign: str
    ascSign: str
    elements: Elements