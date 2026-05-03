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


def get_zodiac_sign_from_longitude(longitude: float) -> str:
    normalized_longitude = longitude % 360
    sign_index = int(normalized_longitude // 30)
    return ZODIAC_SIGNS[sign_index]


def get_timezone_from_coordinates(lat: float, lon: float) -> str:
    tf = TimezoneFinder()
    timezone_name = tf.timezone_at(lat=lat, lng=lon)

    if timezone_name is None:
        raise ValueError("No se pudo determinar la zona horaria del lugar de nacimiento.")

    return timezone_name


def get_utc_datetime(birth_date: str, birth_time: str, lat: float, lon: float) -> datetime:
    timezone_name = get_timezone_from_coordinates(lat, lon)

    local_datetime = datetime.fromisoformat(f"{birth_date}T{birth_time}")
    local_datetime = local_datetime.replace(tzinfo=ZoneInfo(timezone_name))

    return local_datetime.astimezone(ZoneInfo("UTC"))


def calculate_planet_sign(julian_day: float, planet: int) -> str:
    result = swe.calc_ut(julian_day, planet)

    # pyswisseph devuelve una tupla. El primer elemento contiene los datos del planeta.
    longitude = result[0][0]

    return get_zodiac_sign_from_longitude(longitude)


def calculate_basic_chart(
    birth_date: str,
    birth_time: str,
    lat: float,
    lon: float
) -> dict:
    utc_datetime = get_utc_datetime(birth_date, birth_time, lat, lon)

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

    sun_sign = calculate_planet_sign(julian_day, swe.SUN)
    moon_sign = calculate_planet_sign(julian_day, swe.MOON)

    return {
        "sunSign": sun_sign,
        "moonSign": moon_sign,
        "elements": {
            "sun": SIGN_ELEMENTS[sun_sign],
            "moon": SIGN_ELEMENTS[moon_sign],
        }
    }