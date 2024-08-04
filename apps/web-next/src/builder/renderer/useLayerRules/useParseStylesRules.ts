import * as CSS from 'csstype'
import { builderImagePaintScaleModes, builderPaintMode, builderNodes } from '@fragments/fragments-plugin/performance'
import { useLayerInvoker } from '@/builder/hooks/useLayerInvoker'
import { useDisplayColor } from '@/builder/hooks/useDisplayColor'
import { to } from '@react-spring/web'
import { toPx } from '@/app/utils/toPx'
import { builderBorderType, builderLayerMode } from '@fragments/fragments-plugin'

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

  const borderType = layerInvoker('borderType').value
  const borderWidth = layerInvoker('borderWidth').value
  const borderColor = layerInvoker('borderColor').value

  const fillType = layerInvoker('fillType').value
  const solidFill = layerInvoker('solidFill').value
  const imageFill = layerInvoker('imageFill').value
  const imageFillScaleMode = layerInvoker('imageFillScaleMode').value

  const cornerRadius = layerInvoker('cornerRadius').value
  const topLeftRadius = layerInvoker('topLeftRadius').value
  const topRightRadius = layerInvoker('topRightRadius').value
  const bottomLeftRadius = layerInvoker('bottomLeftRadius').value
  const bottomRightRadius = layerInvoker('bottomRightRadius').value

  rules.background = to([fillType, getColor(solidFill), imageFill], (fillType, solidFill, imageFill) => {
    if (fillType === builderPaintMode.Solid) {
      return solidFill
    } else if (fillType === builderPaintMode.Image) {
      return `url(${imageFill}) no-repeat`
    }

    return ''
  })

  rules.backgroundSize = to([fillType, imageFillScaleMode], (type, scaleMode) => {
    if (type === builderPaintMode.Image) {
      return scaleModeMap[scaleMode]
    }
    return undefined
  })

  rules.border = to([borderType, borderWidth, getColor(borderColor)], (type, width, color) => {
    if (type && type !== builderBorderType.None) {
      return `${toPx(width)} ${type.toLowerCase()} ${color}`
    }
    return ''
  })

  rules.borderRadius = to(
    [cornerRadius, topLeftRadius, topRightRadius, bottomLeftRadius, bottomRightRadius],
    (radius, tl, tr, bl, br) => (radius === -1 ? `${toPx(tl)} ${toPx(tr)} ${toPx(br)} ${toPx(bl)}` : toPx(radius))
  )

  return {
    opacity: layerInvoker('opacity').value,
    display: to([layerInvoker('visible').value, isFlex], (value, isFlex) =>
      value ? (isFlex ? 'flex' : 'block') : 'none'
    ),
    ...rules
  }
}
