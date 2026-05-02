// 
export type ZodiacSign =
  | "Aries"
  | "Tauro"
  | "Géminis"
  | "Cáncer"
  | "Leo"
  | "Virgo"
  | "Libra"
  | "Escorpio"
  | "Sagitario"
  | "Capricornio"
  | "Acuario"
  | "Piscis"

export interface BasicChartResult {
  sunSign: ZodiacSign
}