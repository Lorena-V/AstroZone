export interface BirthFormData {
  name: string
  birthDate: string
  birthTime: string
  birthPlace: string
  gender: "femenino" | "masculino" | "no_decirlo" | "otro"
}