export interface ChartInput {
  name: string
  gender?: string
  sunSign: string
  moonSign: string
  ascSign: string
  elements: {
    sun: string
    moon: string
    asc: string
  }
}