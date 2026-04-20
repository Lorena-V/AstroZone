import { useState } from "react"
import { sendInterpretation } from "../services/apiService"
import type { ChartInput } from "../types/chart"

export default function BirthForm() {
  const [result, setResult] = useState<string>("")
  const [loading, setLoading] = useState(false)

  async function handleTest() {
    setLoading(true)
    setResult("")

    const fakeData: ChartInput = {
      name: "Lorena",
      gender: "femenino",
      sunSign: "Aries",
      moonSign: "Escorpio",
      ascSign: "Cancer",
      elements: {
        sun: "Fuego",
        moon: "Agua",
        asc: "Agua",
      },
    }

    try {
      const response = await sendInterpretation(fakeData)
      setResult(JSON.stringify(response, null, 2))
    } catch (error) {
      setResult("Error al conectar con el backend")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button onClick={handleTest} disabled={loading}>
        {loading ? "Probando..." : "Probar conexión con backend"}
      </button>

      {result && (
        <pre style={{ marginTop: "1rem", textAlign: "left" }}>{result}</pre>
      )}
    </div>
  )
}