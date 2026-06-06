
import { SwissEphemeris, Planet } from "@swisseph/browser"
import type { ZodiacSign } from "../types/astrology"


let sweInstance: SwissEphemeris | null = null
async function getSwissEphemeris() {
  if (!sweInstance) {
    sweInstance = new SwissEphemeris()
    await sweInstance.init()
  }

  return sweInstance
}

export function getZodiacSignFromLongitude(longitude: number): ZodiacSign {

    if (!Number.isFinite(longitude)) {
    throw new Error("Debe ser un numero válido.")
    }    
    const zodiacSigns: ZodiacSign[] = [
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

    const normalizedLongitude = ((longitude % 360) + 360) % 360
    const signIndex = Math.floor(normalizedLongitude / 30)

    return zodiacSigns[signIndex]
}

export function getSunSign(birthDate: string): ZodiacSign {
    const date = new Date(`${birthDate}T12:00:00`)
    const month = date.getMonth() + 1
    const day = date.getDate()

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries"
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Tauro"
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Géminis"
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cáncer"
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo"
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo"
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra"
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Escorpio"
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagitario"
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricornio"
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Acuario"

    // si no es ninguno anterior, devuelve picis
    return "Piscis"
}

export async function getMoonSign(
  birthDate: string,
  birthTime: string
): Promise<ZodiacSign> {
  const swe = await getSwissEphemeris()

  const date = new Date(`${birthDate}T${birthTime}:00`)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour =
    date.getHours() +
    date.getMinutes() / 60 +
    date.getSeconds() / 3600

  const jd = swe.julianDay(year, month, day, hour)
  const moon = swe.calculatePosition(jd, Planet.Moon)

  return getZodiacSignFromLongitude(moon.longitude)
}
