import { SpringValue } from '@react-spring/web'
import { animatableValue } from '@/shared/utils/animatableValue'
import { colorToObject } from '@fragments/utils'

interface ReturnColor {
  r: number
  g: number
  b: number
  a: number
}

interface InputColor {
  r: number | SpringValue<number>
  g: number | SpringValue<number>
  b: number | SpringValue<number>
  a?: number | SpringValue<number>
}

export const getStaticColor = (color: string | InputColor): ReturnColor | null => {
  const colorObject = colorToObject(color)
  if (!colorObject) {
    return null
  }

  return {
    r: animatableValue(colorObject.r),
    g: animatableValue(colorObject.g),
    b: animatableValue(colorObject.b),
    a: animatableValue(colorObject.a)
  }
}
