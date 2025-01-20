export type Advocate = {
  id: number
  firstName: string
  lastName: string
  city: string
  degree: string
  specialties: {
    [key: number]: string
  }
  yearsOfExperience: number
  phoneNumber: number
}
