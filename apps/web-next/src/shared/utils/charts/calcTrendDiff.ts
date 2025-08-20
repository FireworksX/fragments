import { isValue } from '@fragmentsx/utils'

export const calcTrendDiff = (valueOne?: number, valueTwo?: number): number => {
  if (!isValue(valueOne) || !isValue(valueTwo)) return 0

  return Math.abs((valueOne - valueTwo) / 100)
}
