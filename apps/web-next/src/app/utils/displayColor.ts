import { Color } from 'react-color'
import { to } from '@react-spring/web'

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
    const resR = Number(r?.toFixed(0))
    const resG = Number(g?.toFixed(0))
    const resB = Number(b?.toFixed(0))
    const resA = Number(a?.toFixed(0))

    return r ? (a < 1 ? `rgba(${resR}, ${resG}, ${resB}, ${resA})` : `rgb(${resR}, ${resG}, ${resB})`) : undefined
  })
