export function generateRandomId (lengt = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < lengt; i++) {
    const index = Math.floor(Math.random() * chars.length)
    result += chars.charAt(index)
  }
  return result
}
