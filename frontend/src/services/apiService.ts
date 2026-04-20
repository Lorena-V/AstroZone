import type { ChartInput } from "../types/chart"

export async function sendInterpretation(data: ChartInput) {
  const response = await fetch("http://127.0.0.1:8000/api/interpretation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Error al conectar con el backend")
  }

  return response.json()
}