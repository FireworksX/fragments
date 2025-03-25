export const fromPx = (val?: string | number): number => {
  if (typeof val === 'string') {
    return Number(val.replace('px', ''))
  }

  return val || 0
}
