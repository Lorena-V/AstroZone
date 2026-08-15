import { useState } from "react"
import type { BirthFormData } from "../types/form"
import {
  searchPlacesByCityCountry,
  type PlaceResult,
} from "../services/geocodingService"
import { buildApiUrl } from "../services/apiConfig"

export interface ResultadoCartaData {
  name: string
  birthPlace: string
  coordinates: {
    lat: number
    lon: number
  }
  chart: {
    solSign: string
    lunaSign: string
    ascSign: string
    elements: {
      sol: string
      luna: string
      asc: string
    }
  }
}

interface BirthFormProps {
  onResult: (result: ResultadoCartaData | null) => void
}

const initialFormData: BirthFormData = {
  name: "",
  birthDate: "",
  birthTime: "",
  birthPais: "",
  birthCiudad: "",
  gender: "otro",
}

// Componente: formulario de ingreso de datos de nacimiento
export default function BirthForm({ onResult }: BirthFormProps) {
  const [formData, setFormData] = useState<BirthFormData>(initialFormData)
  const [error, setError] = useState("")
  const [resultadoLugares, setResultadoLugares] = useState<PlaceResult[]>([])
  const [lugarSeleccionado, setLugarSeleccionado] = useState<PlaceResult | null>(
    null
  )
  const [isBuscandoLugar, setIsBuscandoLugar] = useState(false)

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target

    if (name === "birthPais" || name === "birthCiudad") {
      setLugarSeleccionado(null)
      setResultadoLugares([])
    }

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  async function handleBuscarLugar() {
    setError("")

    if (!formData.birthPais.trim()) {
      setError("El país de nacimiento es obligatorio.")
      return
    }

    if (!formData.birthCiudad.trim()) {
      setError("La ciudad de nacimiento es obligatoria.")
      return
    }

    setIsBuscandoLugar(true)
    setResultadoLugares([])

    try {
      const lugares = await searchPlacesByCityCountry(
        formData.birthPais.trim(),
        formData.birthCiudad.trim()
      )

      if (!lugares.length) {
        setError("No se encontraron lugares para esa ciudad y país.")
        return
      }

      setResultadoLugares(lugares)
    } catch (error) {
      console.error(error)
      setError("No se pudo buscar el lugar. Intenta de nuevo.")
    } finally {
      setIsBuscandoLugar(false)
    }
  }

  function handleSeleccionarLugar(lugar: PlaceResult) {
    setLugarSeleccionado(lugar)
    setResultadoLugares([])
    setError("")
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")

    if (!formData.name.trim()) {
      setError("El nombre es obligatorio.")
      return
    }

    if (!formData.birthDate) {
      setError("La fecha de nacimiento es obligatoria.")
      return
    }

    if (!formData.birthTime) {
      setError("La hora de nacimiento es obligatoria.")
      return
    }

    if (!formData.birthPais.trim()) {
      setError("El país de nacimiento es obligatorio.")
      return
    }

    if (!formData.birthCiudad.trim()) {
      setError("La ciudad de nacimiento es obligatoria.")
      return
    }

    if (!lugarSeleccionado) {
      setError("Debes buscar y seleccionar un lugar de nacimiento.")
      return
    }

    try {
      const response = await fetch(buildApiUrl("/api/chart"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          birthDate: formData.birthDate,
          birthTime: formData.birthTime,
          birthPlace: lugarSeleccionado.displayName,
          gender: formData.gender,
          lat: lugarSeleccionado.lat,
          lon: lugarSeleccionado.lon,
        }),
      })

      if (!response.ok) {
        throw new Error(`Error en la respuesta del backend: ${response.statusText}`)
      }

      const backendResponse = await response.json()
      onResult(backendResponse)
    } catch (error) {
      console.error(error)
      setError("No se pudo obtener la ubicación o procesar la carta. Intenta de nuevo.")
    }
  }

  return (
    <div className="birth-form-wrapper">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre: </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ej: Loraine"
          />
        </div>

        <div>
          <label>Fecha de nacimiento: </label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Hora de nacimiento: </label>
          <input
            type="time"
            name="birthTime"
            value={formData.birthTime}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>País de nacimiento: </label>
          <input
            type="text"
            name="birthPais"
            value={formData.birthPais}
            onChange={handleChange}
            placeholder="Ej: Chile"
          />
        </div>
        <div>
          <label>Ciudad de nacimiento: </label>
          <input
            type="text"
            name="birthCiudad"
            value={formData.birthCiudad}
            onChange={handleChange}
            placeholder="Ej: La Serena"
          />
        </div>

        <button
          type="button"
          onClick={handleBuscarLugar}
          disabled={isBuscandoLugar}
        >
          {isBuscandoLugar ? "Buscando..." : "Buscar lugar"}
        </button>

        {resultadoLugares.length > 0 && (
          <ul>
            {resultadoLugares.map((lugar) => (
              <li key={`${lugar.lat}-${lugar.lon}-${lugar.displayName}`}>
                <button type="button" onClick={() => handleSeleccionarLugar(lugar)}>
                  {lugar.displayName}
                </button>
              </li>
            ))}
          </ul>
        )}

        {lugarSeleccionado && (
          <p>
            <strong>Lugar seleccionado: </strong>{" "}
            {lugarSeleccionado.displayName}
          </p>
        )}

        <div>
          <label>Género: </label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="otro">Otro</option>
            <option value="no_decirlo">Prefiero no decirlo</option>
            <option value="femenino">Femenino</option>
            <option value="masculino">Masculino</option>
          </select>
        </div>

        {error && <p style={{ color: "crimson" }}>{error}</p>}

        <button type="submit">Ver mi carta</button>
      </form>

    </div>
  )
}
