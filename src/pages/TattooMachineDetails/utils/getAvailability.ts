export const getAvailability = (stock: number) => {
  if (stock === 0) return "availability.run-out"
  if (stock > 100) return "availability.plenty"
  if (stock > 0) return "availability.limited"

  return "availability.limited"
}