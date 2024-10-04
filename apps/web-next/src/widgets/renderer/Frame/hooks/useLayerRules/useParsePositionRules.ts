import * as CSS from 'csstype'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { toPx } from '@/app/utils/toPx'

export const useParsePositionRules = (layerField: Field) => {
  const layerInvoker = useLayerInvoker(layerField)
  const rules: CSS.Properties = {}

  const positionType = layerInvoker('positionType').value

  rules.position = positionType ?? 'relative'

  if (positionType === 'absolute') {
    rules.top = toPx(layerInvoker('y').value)
    rules.left = toPx(layerInvoker('x').value)
  }

  return rules
}
