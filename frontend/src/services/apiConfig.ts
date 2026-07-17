const fallbackApiBaseUrl =
  typeof window !== "undefined" && window.location.hostname === "astrozone.lorainecode.cl"
    ? "https://api.astrozone.lorainecode.cl"
    : "http://localhost:8000"

export function getApiBaseUrl() {
  return (import.meta.env.VITE_API_URL || fallbackApiBaseUrl).replace(/\/$/, "")
}

export function buildApiUrl(path: string) {
  return `${getApiBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`
}
