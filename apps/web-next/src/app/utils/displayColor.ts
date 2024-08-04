import { Color } from 'react-color'
import { to } from '@react-spring/web'
import { rgbToHex } from '@fragments/utils'

export const displayColor = (color?: Color) => {
  if (color) {
    if (typeof color === 'string') return color

    if (color.r) {
      return color?.a < 1
        ? `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
        : `rgb(${color.r}, ${color.g}, ${color.b})`
    }
  }

  return undefined
}

export const displayColorInterpolate = (color: Color = {}) =>
  to([color?.r, color?.g, color?.b, color?.a], (r, g, b, a) => {
    const resR = Number(r)
    const resG = Number(g)
    const resB = Number(b)
    const resA = Number(a)

    if ([r, g, b].every(isFinite)) {
      if (resA < 1) {
        return `rgba(${resR}, ${resG}, ${resB}, ${resA})`
      }

      return `rgb(${resR}, ${resG}, ${resB})`
    }
    return undefined
  })
