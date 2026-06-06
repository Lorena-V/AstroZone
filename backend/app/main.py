import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.interpretation import router as interpretation_router

app = FastAPI(title="AstroZone App API")

allowed_origins = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:5173,http://127.0.0.1:5173",
).split(",")

# Config de CORS para permitir solicitudes desde los orígenes especificados, 
# incluyendo subdominios de loca.lt y localtunnel.me
app.add_middleware(
    CORSMiddleware, 
    allow_origins=[origin.strip() for origin in allowed_origins if origin.strip()],
    allow_origin_regex=r"https://.*\.(loca\.lt|localtunnel\.me)$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rutas de interpretación bajo el prefijo /api
app.include_router(interpretation_router, prefix="/api")