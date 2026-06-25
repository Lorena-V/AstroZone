# Este archivo contiene la lógica para calcular la carta natal básica utilizando la biblioteca pyswisseph.
# Se incluyen funciones para convertir la fecha y hora de nacimiento a UTC, 
# obtener la zona horaria a partir de las coordenadas, 
# calcular la longitud eclíptica de los planetas
from datetime import datetime
from zoneinfo import ZoneInfo

import swisseph as swe
from timezonefinder import TimezoneFinder


ZODIAC_SIGNS = [
    "Aries",
    "Tauro",
    "Géminis",
    "Cáncer",
    "Leo",
    "Virgo",
    "Libra",
    "Escorpio",
    "Sagitario",
    "Capricornio",
    "Acuario",
    "Piscis",
]

SIGN_ELEMENTS = {
    "Aries": "Fuego",
    "Leo": "Fuego",
    "Sagitario": "Fuego",
    "Tauro": "Tierra",
    "Virgo": "Tierra",
    "Capricornio": "Tierra",
    "Géminis": "Aire",
    "Libra": "Aire",
    "Acuario": "Aire",
    "Cáncer": "Agua",
    "Escorpio": "Agua",
    "Piscis": "Agua",
}

# Función para obtener el signo zodiacal a partir de la longitud eclíptica del planeta
def get_zodiac_sign_from_longitude(longitude: float) -> str:
    normalized_longitude = longitude % 360
    sign_index = int(normalized_longitude // 30)
    return ZODIAC_SIGNS[sign_index]

# Función para obtener la zona horaria a partir de las coordenadas
def get_timezone_desde_coordenadas(lat: float, lon: float) -> str:
    tf = TimezoneFinder()
    timezone_nombre = tf.timezone_at(lat=lat, lng=lon)

    if timezone_nombre is None:
        raise ValueError("No se pudo determinar la zona horaria del lugar de nacimiento.")

    return timezone_nombre

# Función para convertir la fecha y hora de nacimiento a UTC
def get_utc_fechahora(fecha_nacimiento: str, birth_time: str, lat: float, lon: float) -> datetime:
    timezone_nombre = get_timezone_desde_coordenadas(lat, lon)

    local_datetime = datetime.fromisoformat(f"{fecha_nacimiento}T{birth_time}")
    local_datetime = local_datetime.replace(tzinfo=ZoneInfo(timezone_nombre))

    return local_datetime.astimezone(ZoneInfo("UTC"))

# Función para calcular el signo zodiacal de un planeta dado el día juliano y el planeta
def calculate_planet_sign(julian_day: float, planet: int) -> str:
    result = swe.calc_ut(julian_day, planet)

    # pyswisseph devuelve una tupla. El primer elemento contiene los datos del planeta.
    longitude = result[0][0]

    return get_zodiac_sign_from_longitude(longitude)

# Función para calcular el signo ascendente usando casas Placidus.
def calcular_signo_ascendente(julian_day: float, lat: float, lon: float) -> str:
    _, ascmc = swe.houses(julian_day, lat, lon, b"P")

    # En pyswisseph, ascmc[0] corresponde a la longitud zodiacal del ascendente.
    asc_longitude = ascmc[0]

    return get_zodiac_sign_from_longitude(asc_longitude)

# Función principal para calcular el mapa natal básico
def calculo_carta_basica(
    fecha_nacimiento: str,
    birth_time: str,
    lat: float,
    lon: float
) -> dict:
    utc_datetime = get_utc_fechahora(fecha_nacimiento, birth_time, lat, lon)

    utc_hour = (
        utc_datetime.hour
        + utc_datetime.minute / 60
        + utc_datetime.second / 3600
    )

    julian_day = swe.julday(
        utc_datetime.year,
        utc_datetime.month,
        utc_datetime.day,
        utc_hour
    )

    sol_sign = calculate_planet_sign(julian_day, swe.SUN)
    luna_sign = calculate_planet_sign(julian_day, swe.MOON)
    asc_sign = calcular_signo_ascendente(julian_day, lat, lon)

    return {
        "solSign": sol_sign,
        "lunaSign": luna_sign,
        "ascSign": asc_sign,
        "elements": {
            "sun": SIGN_ELEMENTS[sol_sign],
            "moon": SIGN_ELEMENTS[luna_sign],
            "asc": SIGN_ELEMENTS[asc_sign],
        }
    }
