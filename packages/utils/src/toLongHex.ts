/**
 * #f0f -> #ff00ff
 */
export const toLongHex = (hex: string) => {
  const chars = hex.slice(1)

  if (chars.length === 3) {
    hex = '#' + chars
      .split('')
      .map(val => `${val}${val}`)
      .join('')
  }

  return hex
}