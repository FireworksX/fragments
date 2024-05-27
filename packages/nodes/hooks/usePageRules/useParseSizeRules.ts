import { Field } from '@adstore/statex/src'
import * as CSS from 'csstype'
import { toPx } from '../../helpers/toPx.ts'
import { toPercent } from '../../helpers/toPercent.ts'
import { useLayerInvokerNew } from '../useLayerInvokerNew.ts'
import { builderSizing } from '@adstore/web/src/data/promos/creators'

export const useParseSizeRules = (layerField: Field) => {
  const layerInvoker = useLayerInvokerNew(layerField)
  const rules: CSS.Properties = {}

  const layoutSizingHorizontal = layerInvoker('layoutSizingHorizontal').value
  const layoutSizingVertical = layerInvoker('layoutSizingVertical').value
  const widthValue = layerInvoker('width').value
  const heightValue = layerInvoker('height').value

  switch (layoutSizingHorizontal) {
    case builderSizing.Hug:
      rules.width = 'fit-content'
      break
    case builderSizing.Fill:
      rules.width = 'auto'
      break
    case builderSizing.Fixed:
      rules.width = toPx(widthValue)
      break
    case builderSizing.Relative:
      rules.width = toPercent(widthValue)
      break
    default:
      rules.width = 'auto'
  }

  switch (layoutSizingVertical) {
    case builderSizing.Hug:
      rules.height = 'fit-content'
      break
    case builderSizing.Fill:
      rules.height = 'auto'
      break
    case builderSizing.Fixed:
      rules.height = toPx(heightValue)
      break
    case builderSizing.Relative:
      rules.height = toPercent(heightValue)
      break
    default:
      rules.height = '100%'
  }

  return rules
}
