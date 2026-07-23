// Servicio que convierte el lugar ingresado a coordenadas lat y lon utilizando la API de Nominatim (OpenStreetMap)
export interface PlaceResult {
  lat: number
  lon: number
  displayName: string
}

export async function searchPlacesByCityCountry(
  pais: string,
  ciudad: string
): Promise<PlaceResult[]> {
  const params = new URLSearchParams({
    city: ciudad,
    country: pais,
    format: "json",
    limit: "5",
    addressdetails: "1",
  })

  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?${params.toString()}`
  )

  if (!response.ok) {
    throw new Error("Error al consultar el servicio de geocodificación.")
  }

  const data = await response.json()

  if (!Array.isArray(data)) {
    throw new Error("Respuesta inválida del servicio de geocodificación.")
  }

  return data.map((place) => ({
    lat: Number(place.lat),
    lon: Number(place.lon),
    displayName: place.display_name,
  }))
}
