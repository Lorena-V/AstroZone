export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-header__title">
          {/* <p className="site-header__eyebrow">Astrología y autoconocimiento</p> */}
          <h1>AstroZone</h1>
          {/* <p className="site-header__subtitle">
            Descubre tu carta astral con una experiencia clara, visual y sencilla.
          </p> */}
        </div>

        <div className="hero-banner" role="img" aria-label="Banner astral">
          <div className="hero-banner__content">
            {/* <span className="hero-banner__badge">Nuevo</span> */}
            <h2>Explora tu energía, tu personalidad y tu destino</h2>
            <p>
              Conecta tu fecha, hora y lugar de nacimiento para ver tu sol, tu luna y tu ascendente.
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
