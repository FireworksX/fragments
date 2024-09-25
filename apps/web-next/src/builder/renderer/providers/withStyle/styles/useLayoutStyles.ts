import { useContext } from 'react'
import { BuilderContext } from '@/builder/BuilderContext'
import { useLayerInvoker } from '@/builder/hooks/useLayerInvoker'
import { to } from '@react-spring/web'
import { toPx } from '@/app/utils/toPx'
import { definitions } from '@fragments/plugin-state'
import { Graph } from '@graph-state/core'

export const useLayoutStyles = (graph: Graph) => {
  const rules: CSS.Properties = {}

  if (!graph) return {}

  const isFlex = to(graph.resolveField('layerMode'), mode => mode === definitions.layerMode.flex)
  // if (isFlex) {
  //   rules.display = 'flex'
  //   rules.flexDirection = layerInvoker('layerDirection').value === builderLayerDirection.horizontal ? 'row' : 'column'
  //   rules.alignItems = layerInvoker('layerAlign').value
  //   rules.justifyContent = layerInvoker('layerDistribute').value
  //   rules.flexWrap = layerInvoker('layerWrap').value ? 'wrap' : 'nowrap'
  //   rules.gap = layerInvoker('layerGap').value
  // }

  const padding = graph.resolveField('padding')
  const paddingTop = graph.resolveField('paddingTop')
  const paddingRight = graph.resolveField('paddingRight')
  const paddingBottom = graph.resolveField('paddingBottom')
  const paddingLeft = graph.resolveField('paddingLeft')
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
    flexDirection: to(graph.resolveField('layerDirection'), value =>
      value === definitions.layerDirection.horizontal ? 'row' : 'column'
    ),
    alignItems: graph.resolveField('layerAlign'),
    justifyContent: graph.resolveField('layerDistribute'),
    flexWrap: to(graph.resolveField('layerWrap'), v => (v ? 'wrap' : 'nowrap')),
    gap: graph.resolveField('layerGap'),
    ...rules
  }
}
