interface ResultadoCartaProps {
  name: string
  birthPlace: string
  coordinates: {
    lat: number
    lon: number
  }
  solSign: string
  lunaSign: string
  ascSign: string
  elements: {
    sol: string
    luna: string
    asc: string
  }
}

export default function ResultadoCarta({
  name,
  birthPlace,
  coordinates,
  solSign,
  lunaSign,
  ascSign,
  elements,
}: ResultadoCartaProps) {
  const formatCoordinate = (
    value: number,
    positiveHemisphere: string,
    negativeHemisphere: string
  ) => {
    const hemisphere = value >= 0 ? positiveHemisphere : negativeHemisphere
    return `${Math.abs(value).toFixed(4)}° ${hemisphere}`
  }

  return (
    <section
      style={{
        marginTop: "2rem",
        padding: "1.5rem",
        border: "1px solid #ddd",
        borderRadius: "12px",
        backgroundColor: "#fff",
      }}
    >
      <h2>Resultado astrológico</h2>

      <p>
        <strong>Nombre: </strong> {name}
      </p>

      <p>
        <strong>Lugar de nacimiento: </strong> {birthPlace}
      </p>

      <p>
        <strong>Coordenadas: </strong>{" "}
        {formatCoordinate(coordinates.lat, "N", "S")},{" "}
        {formatCoordinate(coordinates.lon, "E", "O")}
      </p>

      <hr />

      <p>
        <strong>Tu sol: </strong> {solSign}
      </p>

      <p>
        <strong>Tu luna: </strong> {lunaSign}
      </p>

      <p>
        <strong>Tu ascendente: </strong> {ascSign}
      </p>
      <p>
        <strong>Elementos de poder: </strong> {elements.sol}, {elements.luna}, {elements.asc}
      </p>
    </section>
  )
}
