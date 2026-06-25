export interface ChartInput {
  name: string
  gender?: string
  solSign: string
  lunaSign: string
  ascSign: string
  elements: {
    sun: string
    moon: string
    asc: string
  }
}