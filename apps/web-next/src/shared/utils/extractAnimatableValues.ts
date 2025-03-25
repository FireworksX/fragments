import { Interpolation, SpringValue, to } from '@react-spring/web'
import { animatableValue } from '@/shared/utils/animatableValue'

export const extractAnimatableValues = (
  target: SpringValue | Interpolation | Record<string, unknown>,
  fields?: string[]
) => {
  if (!target) return null

  if (!fields) {
    fields = Object.keys(animatableValue(target))
  }

  return fields.reduce(
    (acc, field) => ({
      ...acc,
      [field]: to(target, v => v[field])
    }),
    {}
  )
}
