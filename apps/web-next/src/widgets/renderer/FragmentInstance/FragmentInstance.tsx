import { FC, useContext } from 'react'
import { GraphState, LinkKey } from '@graph-state/core'
import { animated } from '@react-spring/web'
import { to } from '@fragments/springs-factory'
import { nodes, sizing } from '@fragments/plugin-fragment-spring'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { BaseRenderNode, defaultRender, defaultRenderNode, Fragment } from '@/widgets/renderer/Fragment/Fragment'
import { useLayerStyles } from '../hooks/useLayerStyles'
import { getFieldValue, getFieldValueMap } from '@fragments/plugin-fragment'
import { InstanceProvider } from '@/widgets/renderer/FragmentInstance/lib/FragmentInstanceContext'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'

export interface DocumentRenderer extends BaseRenderNode {}

export const FragmentInstance: FC<DocumentRenderer> = ({ layerKey, renderParents = [], render = defaultRender }) => {
  const { documentManager } = useBuilderDocument()
  const [instanceGraph] = useGraph(documentManager, layerKey)
  const cssStyles = useLayerStyles(layerKey, renderParents)
  const instanceFragment = getFieldValue(instanceGraph, 'fragment', documentManager)

  return (
    <InstanceProvider instanceLink={layerKey}>
      {render(
        layerKey,
        <animated.div data-key={layerKey} data-type={nodes.FragmentInstance} style={cssStyles}>
          <Fragment layerKey={instanceFragment} renderParents={[...renderParents, layerKey]} render={render} />
        </animated.div>
      )}
    </InstanceProvider>
  )
}
