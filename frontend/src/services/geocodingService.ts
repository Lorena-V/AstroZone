export interface GeocodingResult {
  lat: number
  lon: number
  displayName: string
}

export async function getCoordinates(place: string): Promise<GeocodingResult> {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    place
  )}&limit=1`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Error al consultar el servicio de geocodificación.")
  }

  const data = await response.json()

  if (!data.length) {
    throw new Error("No se encontró el lugar ingresado.")
  }

  return {
    lat: Number(data[0].lat),
    lon: Number(data[0].lon),
    displayName: data[0].display_name,
  }
}