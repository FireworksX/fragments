import * as CSS from 'csstype'
import { builderLayerDirection, builderLayerMode } from '@fragments/fragments-plugin'
import { useContext } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { to } from '@react-spring/web'
import { toPx } from '@/app/utils/toPx'

export const useParseLayoutRules = (layerField: Field) => {
  const { documentManager } = useContext(BuilderContext)
  const layerInvoker = useLayerInvoker(layerField)
  const rules: CSS.Properties = {}

  const isFlex = to(layerInvoker('layerMode').value, mode => mode === builderLayerMode.flex)
  // if (isFlex) {
  //   rules.display = 'flex'
  //   rules.flexDirection = layerInvoker('layerDirection').value === builderLayerDirection.horizontal ? 'row' : 'column'
  //   rules.alignItems = layerInvoker('layerAlign').value
  //   rules.justifyContent = layerInvoker('layerDistribute').value
  //   rules.flexWrap = layerInvoker('layerWrap').value ? 'wrap' : 'nowrap'
  //   rules.gap = layerInvoker('layerGap').value
  // }

  const padding = layerInvoker('padding').value
  const paddingTop = layerInvoker('paddingTop').value
  const paddingRight = layerInvoker('paddingRight').value
  const paddingBottom = layerInvoker('paddingBottom').value
  const paddingLeft = layerInvoker('paddingLeft').value
  // if (padding === graphState.mixed) {
  // try {
  //   rules.paddingTop = toPx(layerInvoker('paddingTop').value)
  //   rules.paddingRight = toPx(layerInvoker('paddingRight').value)
  //   rules.paddingBottom = toPx(layerInvoker('paddingBottom').value)
  //   rules.paddingLeft = toPx(layerInvoker('paddingLeft').value)
  // } catch (e) {
  //   // console.error(e, padding, layerField, statex, statex?.resolve(layerField))
  // }
  // } else {

  rules.padding = to(
    [padding, paddingTop, paddingRight, paddingBottom, paddingLeft],
    (padding, paddingTop, paddingRight, paddingBottom, paddingLeft) => {
      if (padding === -1) {
        return `${toPx(paddingTop)} ${toPx(paddingRight)} ${toPx(paddingBottom)} ${toPx(paddingLeft)}`
      }

      return `${toPx(padding)}`
    }
  )
  // }

  return {
    display: to(isFlex, value => (value ? 'flex' : 'block')),
    flexDirection: to(layerInvoker('layerDirection').value, value =>
      value === builderLayerDirection.horizontal ? 'row' : 'column'
    ),
    alignItems: layerInvoker('layerAlign').value,
    justifyContent: layerInvoker('layerDistribute').value,
    flexWrap: to(layerInvoker('layerWrap').value, v => (v ? 'wrap' : 'nowrap')),
    gap: layerInvoker('layerGap').value,
    ...rules
  }
}
