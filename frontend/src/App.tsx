// Archivo principal, renderiza el layout general, el formulario y el resultado
import { useState } from "react"
import "./App.css"
import BirthForm, { type ResultadoCartaData } from "./components/BirthForm"
import SiteHeader from "./components/SiteHeader"
import SiteFooter from "./components/SiteFooter"
import ResultadoCarta from "./components/ResultadoCarta"

function App() {
  const [resultadoCarta, setResultadoCarta] = useState<ResultadoCartaData | null>(null)

  return (
    <div className="app-shell">
      <SiteHeader />

      <main className="app-main">
        <section className="intro-card">
          <p>
            Para calcular tu carta astrológica completa el formulario. Recuerda
            completar todos los datos, estos deben ser exactos para un resultado
            óptimo.
          </p>
          <p className="intro-card__note">
            *Los datos ingresados son confidenciales y no se almacenarán en el
            servidor.*
          </p>
        </section>

        <section className="content-panel">
          {!resultadoCarta ? (
            <BirthForm onResult={setResultadoCarta} />
          ) : (
            <ResultadoCarta
              name={resultadoCarta.name}
              birthPlace={resultadoCarta.birthPlace}
              coordinates={resultadoCarta.coordinates}
              solSign={resultadoCarta.chart.solSign}
              lunaSign={resultadoCarta.chart.lunaSign}
              ascSign={resultadoCarta.chart.ascSign}
              elements={resultadoCarta.chart.elements}
            />
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

export default App
