interface ResultadoCartaProps {
  name: string
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
  solSign,
  lunaSign,
  ascSign,
  elements,
}: ResultadoCartaProps) {
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
        <strong>Nombre:</strong> {name}
      </p>

      <hr />

      <p>
        <strong>Sol:</strong> {solSign}
      </p>

      <p>
        <strong>Luna:</strong> {lunaSign}
      </p>

      <p>
        <strong>Ascendente:</strong> {ascSign}
      </p>
      <p>
        <strong>Elementos:</strong> {elements.sol}, {elements.luna}, {elements.asc}
      </p>
    </section>
  )
}