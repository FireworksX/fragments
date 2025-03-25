import { SpringValue } from '@react-spring/web'
import { colorToObject, hexToRgb, rgbToRgba } from '@fragments/utils'

interface ReturnColor {
  r: SpringValue<number>
  g: SpringValue<number>
  b: SpringValue<number>
  a: SpringValue<number>
}

interface InputColor {
  r: number | SpringValue<number>
  g: number | SpringValue<number>
  b: number | SpringValue<number>
  a?: number | SpringValue<number>
}

export const getSpringColor = (color: string | InputColor): ReturnColor | null => {
  const colorObject = colorToObject(color)
  if (!colorObject) {
    return null
  }

  return {
    r: new SpringValue(colorObject.r),
    g: new SpringValue(colorObject.g),
    b: new SpringValue(colorObject.b),
    a: new SpringValue(colorObject.a)
  }
}
