import { Interpolation, SpringValue } from '@react-spring/web'

export const animatableValue = <T>(value: T | SpringValue<T> | Interpolation<T>): T => {
  if (value instanceof SpringValue || value instanceof Interpolation) {
    return value.get()
  }

  return value
}
