import * as CSS from 'csstype'
// import { toPx } from '../../helpers/toPx.ts'
// import { toPercent } from '../../helpers/toPercent.ts'
// import { useLayerInvokerNew } from '../useLayerInvokerNew.ts'
// import { builderSizing } from '@fragments/fragments-plugin'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { to } from '@react-spring/web'
import { toPx } from '@/app/utils/toPx'
import { toPercent } from '@/app/utils/toPercent'
import { sizing } from '@fragments/plugin-state'

export const useParseSizeRules = (layerField: Field) => {
  const layerInvoker = useLayerInvoker(layerField)
  const rules: CSS.Properties = {}

  const layoutSizingHorizontal = layerInvoker('layoutSizingHorizontal').value
  const layoutSizingVertical = layerInvoker('layoutSizingVertical').value
  const widthValue = layerInvoker('width').value
  const heightValue = layerInvoker('height').value

  const getValue = (inputSizing: keyof typeof sizing, value: number) => {
    switch (inputSizing) {
      case sizing.Hug:
        return 'fit-content'
      case sizing.Fill:
        return 'auto'
      case sizing.Fixed:
        return value
      case sizing.Relative:
        return toPercent(value)
      default:
        return 'auto'
    }
  }

  return {
    width: to([layoutSizingHorizontal, widthValue], (sizing, value) => getValue(sizing, value)),
    height: to([layoutSizingVertical, heightValue], (sizing, value) => getValue(sizing, value)),
    minHeight: layerField?.minHeight
  }
}
