const fallbackApiBaseUrl =
  typeof window !== "undefined" && window.location.hostname === "astrozone.local"
    ? "http://api.astrozone.local"
    : "http://localhost:8000"

export function getApiBaseUrl() {
  return (import.meta.env.VITE_API_URL || fallbackApiBaseUrl).replace(/\/$/, "")
}

export function buildApiUrl(path: string) {
  return `${getApiBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`
}
