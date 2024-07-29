import * as CSS from 'csstype'
import { builderImagePaintScaleModes, builderPaintMode, builderNodes } from '@fragments/fragments-plugin/performance'
import { useLayerInvoker } from '@/builder/hooks/useLayerInvoker'
import { useDisplayColor } from '@/builder/hooks/useDisplayColor'
import { to } from '@react-spring/web'
import { toPx } from '@/app/utils/toPx'
import { builderLayerMode } from '@fragments/fragments-plugin'

const scaleModeMap: Record<keyof typeof builderImagePaintScaleModes, CSS.Properties['backgroundSize']> = {
  Fill: 'cover',
  Fit: 'contain',
  Crop: 'auto'
}

export const useParseStyleRules = (layerField: Field) => {
  const layerInvoker = useLayerInvoker(layerField)
  const { getColor } = useDisplayColor()
  const rules: CSS.Properties = {}
  const isFlex = to(layerInvoker('layerMode').value, mode => mode === builderLayerMode.flex)

  // rules.opacity = layerInvoker('opacity').value
  // rules.borderRadius = toPx(layerInvoker('cornerRadius').value)
  //
  // if (layerInvoker('visible').value === false) {
  //   rules.display = 'none'
  // }
  //
  const borderValue = layerInvoker('border').value
  // if (borderValue) {
  //   rules.borderWidth = toPx(borderValue.width)
  //   rules.borderStyle = borderValue.type?.toLowerCase()
  //   rules.borderColor = getColor(borderValue.color)
  // }
  //
  const currentFill = layerInvoker('currentFill').value
  const fillType = layerInvoker('fillType').value
  const solidFill = layerInvoker('solidFill').value
  //
  // if (currentFill) {
  //   if (currentFill.type === builderPaintMode.Solid || currentFill._type === builderNodes.SolidPaintStyle) {
  //     rules.backgroundColor = getColor(currentFill.color)
  //   } else if (currentFill.type === builderPaintMode.Image) {
  //     rules.background = `url(${currentFill?.url}) no-repeat`
  //     rules.backgroundSize = scaleModeMap[currentFill.scaleMode]
  //   }
  // }

  rules.background = to([fillType, getColor(solidFill)], (fillType, solidFill) => {
    if (fillType === builderPaintMode.Solid) {
      return solidFill
    }
  })

  return {
    opacity: layerInvoker('opacity').value,
    borderRadius: layerInvoker('cornerRadius').value,
    display: to([layerInvoker('visible').value, isFlex], (value, isFlex) =>
      value ? (isFlex ? 'flex' : 'block') : 'none'
    ),
    borderWidth: borderValue?.width,
    borderStyle: borderValue?.type,
    borderColor: getColor(borderValue?.color),
    ...rules
  }
}
