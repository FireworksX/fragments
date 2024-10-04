import * as CSS from 'csstype'
// import { toPx } from '../../helpers/toPx.ts'
// import { toPercent } from '../../helpers/toPercent.ts'
// import { useLayerInvokerNew } from '../useLayerInvokerNew.ts'
// import { builderSizing } from '@fragments/fragments-plugin'
import { useLayerInvoker } from '@/builder/hooks/useLayerInvoker'
import { to } from '@react-spring/web'
import { builderSizing } from '@fragments/fragments-plugin/performance'
import { toPx } from '@/app/utils/toPx'
import { toPercent } from '@/app/utils/toPercent'

export const useParseSizeRules = (layerField: Field) => {
  const layerInvoker = useLayerInvoker(layerField)
  const rules: CSS.Properties = {}

  const layoutSizingHorizontal = layerInvoker('layoutSizingHorizontal').value
  const layoutSizingVertical = layerInvoker('layoutSizingVertical').value
  const widthValue = layerInvoker('width').value
  const heightValue = layerInvoker('height').value

  const getValue = (sizing: keyof typeof builderSizing, value: number) => {
    switch (sizing) {
      case builderSizing.Hug:
        return 'fit-content'
      case builderSizing.Fill:
        return 'auto'
      case builderSizing.Fixed:
        return value
      case builderSizing.Relative:
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
