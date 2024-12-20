import { FC, useContext } from 'react'
import { GraphState, LinkKey } from '@graph-state/core'
import { animated } from '@react-spring/web'
import { to } from '@fragments/springs-factory'
import { nodes, sizing } from '@fragments/plugin-fragment-spring'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { Fragment } from '@/widgets/renderer/Fragment/Fragment'
import { useLayerStyles } from '@/shared/hooks/fragmentBuilder/useLayerStyles'
import { getFieldValue, getFieldValueMap } from '@fragments/plugin-fragment'
import { InstanceProvider } from '@/widgets/renderer/FragmentInstance/lib/FragmentInstanceContext'

export interface DocumentRenderer {
  layerKey?: LinkKey
  renderParents?: LinkKey[]
  documentManager: GraphState
}

export const FragmentInstance: FC<DocumentRenderer> = ({ layerKey, renderParents = [] }) => {
  const { documentManager } = useContext(BuilderContext)
  const [instanceGraph] = useGraph(documentManager, layerKey)
  const cssStyles = useLayerStyles(layerKey, renderParents)
  const instanceFragment = getFieldValue(instanceGraph, 'fragment', documentManager)

  return (
    <InstanceProvider instanceLink={layerKey}>
      <animated.div data-key={layerKey} data-type={nodes.FragmentInstance} style={cssStyles}>
        <Fragment layerKey={instanceFragment} renderParents={[...renderParents, layerKey]} />
      </animated.div>
    </InstanceProvider>
  )
}
