import "./App.css"
import BirthForm from "./components/BirthForm"

function App() {
  return (
    <main style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem" }}>
      <h1>Astro Zone</h1>
      <p>Setup inicial: React + FastAPI</p>
      <BirthForm />
    </main>
  )
}

export default App
