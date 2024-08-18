import { SpringValue } from '@react-spring/web'

export const animatableValue = <T>(value: T | SpringValue<T>): T => {
  if (value instanceof SpringValue) {
    return value.get()
  }

  return value
}
