import { FC, useContext } from 'react'
import { GraphState, LinkKey } from '@graph-state/core'
import { animated } from '@react-spring/web'
import { to } from '@fragments/springs-factory'
import { nodes, sizing } from '@fragments/plugin-fragment-spring'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { Fragment } from '@/widgets/renderer/Fragment/Fragment'
import { useLayerStyles } from '@/shared/hooks/fragmentBuilder/useLayerStyles'
import { getFieldValueMap } from '@fragments/plugin-fragment'

export interface DocumentRenderer {
  layerKey?: LinkKey
  renderParents?: LinkKey[]
  documentManager: GraphState
}

export const FragmentInstance: FC<DocumentRenderer> = ({ layerKey, renderParents = [] }) => {
  const { documentManager } = useContext(BuilderContext)
  const [instanceGraph] = useGraph(documentManager, layerKey)
  const cssStyles = useLayerStyles(layerKey)
  const { layoutSizingVertical, layoutSizingHorizontal } = getFieldValueMap(
    layerKey,
    ['layoutSizingHorizontal', 'layoutSizingVertical'],
    documentManager
  )

  return (
    <animated.div data-key={layerKey} data-type={nodes.FragmentInstance} style={cssStyles}>
      <Fragment
        layerKey={instanceGraph?.fragment}
        renderParents={[...renderParents, layerKey]}
        // style={{
        //   width: source =>
        //     to([layoutSizingHorizontal, source], (hSizing, sourceValue) =>
        //       hSizing === sizing.Hug ? sourceValue : '100%'
        //     ),
        //   height: source =>
        //     to([layoutSizingVertical, source], (wSizing, sourceValue) =>
        //       wSizing === sizing.Hug ? sourceValue : '100%'
        //     )
        // }}
      />
    </animated.div>
  )
}
