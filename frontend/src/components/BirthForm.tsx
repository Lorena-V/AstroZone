import { useState } from "react"
import type { BirthFormData } from "../types/form"

const initialFormData: BirthFormData = {
  name: "",
  birthDate: "",
  birthTime: "",
  birthPlace: "",
  gender: "no_decirlo",
}

export default function BirthForm() {
  const [formData, setFormData] = useState<BirthFormData>(initialFormData)
  const [error, setError] = useState("")

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")

    if (!formData.name.trim()) {
      setError("El nombre es obligatorio.")
      return
    }

    /* if (!formData.birthDate) {
      setError("La fecha de nacimiento es obligatoria.")
      return
    } */

    if (!formData.birthTime) {
      setError("La hora de nacimiento es obligatoria.")
      return
    }

    if (!formData.birthPlace.trim()) {
      setError("El lugar de nacimiento es obligatorio.")
      return
    }

    console.log("Datos del formulario:", formData)
    alert("Formulario válido. Revisa la consola.")
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ej: Loraine"
        />
      </div>

      <div>
        <label>Fecha de nacimiento</label>
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Hora de nacimiento</label>
        <input
          type="time"
          name="birthTime"
          value={formData.birthTime}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Lugar de nacimiento</label>
        <input
          type="text"
          name="birthPlace"
          value={formData.birthPlace}
          onChange={handleChange}
          placeholder="Ej: La Serena, Chile"
        />
      </div>

      <div>
        <label>Género</label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="otro">Otro</option>
          <option value="no_decirlo">Prefiero no decirlo</option>
          <option value="femenino">Femenino</option>
          <option value="masculino">Masculino</option>
        </select>
      </div>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <button type="submit">Calcular mi carta</button>
    </form>
  )
}