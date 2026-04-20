# AstroZone

Una aplicación full-stack para la interpretación y análisis de cartas astrológicas. AstroZone combina un frontend moderno en React con un backend en FastAPI para proporcionar una plataforma intuitiva para explorar información astrológica.

## Estructura del Proyecto

```
AstroZone/
├── frontend/          # Aplicación frontend en React TypeScript
│   ├── src/          # Código fuente
│   ├── public/       # Activos estáticos
│   └── package.json  # Dependencias del frontend
├── backend/          # Backend en FastAPI con Python
│   ├── app/          # Código de la aplicación
│   │   ├── routes/   # Puntos finales de API
│   │   ├── schemas/  # Modelos de datos
│   │   ├── services/ # Lógica de negocio
│   │   ├── core/     # Funcionalidad central
│   │   └── utils/    # Funciones utilitarias
│   └── requirements.txt # Dependencias de Python
└── README.md         # Este archivo
```

## Stack Tecnológico

### Frontend
- **React** 19.2.4 - Biblioteca de UI
- **TypeScript** - JavaScript con tipos seguros
- **Vite** - Herramienta de construcción y servidor de desarrollo rápido
- **ESLint** - Calidad de código y linting

### Backend
- **FastAPI** - Framework web moderno de Python
- **Pydantic** - Validación de datos
- **Uvicorn** - Servidor ASGI
- **Python 3.x** - Runtime del backend

## Primeros Pasos

### Requisitos Previos
- Node.js (se recomienda LTS más reciente)
- Python 3.8+
- npm o yarn

### Configuración del Frontend

1. Navega al directorio del frontend:
```bash
cd frontend
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

### Configuración del Backend

1. Navega al directorio del backend:
```bash
cd backend
```

2. Crea y activa un entorno virtual:
```bash
python -m venv .venv
source .venv/bin/activate  # En Windows: .venv\Scripts\activate
```

3. Instala las dependencias:
```bash
pip install -r requirements.txt
```

4. Ejecuta el servidor de desarrollo:
```bash
uvicorn app.main:app --reload
```

La API del backend estará disponible en `http://localhost:8000`

## Puntos Finales de API

### Verificación de Salud
- **GET** `/api/health` - Verifica el estado de salud de la API

### Interpretación
- **POST** `/api/interpretation` - Envía datos de carta astrológica para interpretación

## Scripts Disponibles

### Frontend
- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construcción para producción
- `npm run lint` - Ejecuta ESLint
- `npm run preview` - Vista previa de la construcción en producción

### Backend
- `uvicorn app.main:app --reload` - Inicia el servidor de desarrollo con recarga automática
- `uvicorn app.main:app` - Inicia el servidor de producción

## Desarrollo

Tanto el frontend como el backend están configurados con capacidades de recarga activa para un desarrollo eficiente. CORS está configurado para permitir solicitudes desde el servidor de desarrollo del frontend.


