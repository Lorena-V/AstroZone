// Archivo principal, renderiza el form y envia los datos al backend
import "./App.css"
import BirthForm from "./components/BirthForm" // form de entrada de datos

function App() {
  return (
    <main style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem" }}>
      <h1>Astro Zone</h1>
      <p>Setup inicial: React + FastAPI</p>
      <BirthForm /> {/* Renderiza el formulario para ingresar datos de nacimiento */} 
    </main>
  )
}

export default App
