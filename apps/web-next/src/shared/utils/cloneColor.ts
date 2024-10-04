import { SpringValue } from '@react-spring/web'

type Value = SpringValue<number>

export const cloneColor = (color: { r: Value; g: Value; b: Value; a: Value }) =>
  Object.entries(color).reduce((acc, [key, value]) => {
    acc[key] = value instanceof SpringValue ? new SpringValue(value.get()) : value
    return acc
  }, {})
