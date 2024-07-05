import * as CSS from 'csstype'
import { builderImagePaintScaleModes, builderPaintMode, builderNodes } from '@fragments/fragments-plugin/performance'
import { useLayerInvoker } from '@/builder/hooks/useLayerInvoker'
import { useDisplayColor } from '@/builder/hooks/useDisplayColor'
import { to } from '@react-spring/web'
import { toPx } from '@/app/utils/toPx'

const scaleModeMap: Record<keyof typeof builderImagePaintScaleModes, CSS.Properties['backgroundSize']> = {
  Fill: 'cover',
  Fit: 'contain',
  Crop: 'auto'
}

export const useParseStyleRules = (layerField: Field) => {
  const layerInvoker = useLayerInvoker(layerField, undefined, ({ node, key }) => {
    switch (key) {
      case 'currentFill':
        return node?.getCurrentFill?.()
    }
  })
  const { getColor } = useDisplayColor()
  const rules: CSS.Properties = {}

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
  //
  if (currentFill) {
    if (currentFill.type === builderPaintMode.Solid || currentFill._type === builderNodes.SolidPaintStyle) {
      rules.backgroundColor = getColor(currentFill.color)
    } else if (currentFill.type === builderPaintMode.Image) {
      rules.background = `url(${currentFill?.url}) no-repeat`
      rules.backgroundSize = scaleModeMap[currentFill.scaleMode]
    }
  }

  return {
    opacity: layerInvoker('opacity').value,
    borderRadius: layerInvoker('cornerRadius').value,
    display: to(layerInvoker('visible').value, value => (value ? 'block' : 'none')),
    borderWidth: borderValue?.width,
    borderStyle: borderValue?.type,
    borderColor: getColor(borderValue?.color),
    ...rules
  }
}
