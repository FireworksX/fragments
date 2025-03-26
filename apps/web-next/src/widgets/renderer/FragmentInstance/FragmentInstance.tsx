import { FC, use, useContext } from 'react'
import { GraphState, LinkKey } from '@graph-state/core'
import { animated } from '@react-spring/web'
import { definition } from '@fragments/definition'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { BaseRenderNode, defaultRender, defaultRenderNode, Fragment } from '@/widgets/renderer/Fragment/Fragment'
import { useLayerStyles } from '../hooks/useLayerStyles'
import { getFieldValue, getFieldValueMap } from '@fragments/plugin-fragment'
import { InstanceProvider } from '@/widgets/renderer/FragmentInstance/lib/FragmentInstanceContext'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import {
  FragmentDocumentContext,
  FragmentDocumentProvider
} from '@/widgets/renderer/Fragment/lib/FragmentDocumentContext'

export interface DocumentRenderer extends BaseRenderNode {}

export const FragmentInstance: FC<DocumentRenderer> = ({ layerKey, renderParents = [], render = defaultRender }) => {
  const { builderManager } = use(BuilderContext)
  const { documentManager } = use(FragmentDocumentContext)
  // const [instanceGraph] = useGraph(documentManager, layerKey)
  // const cssStyles = useLayerStyles(layerKey, renderParents)
  // const instanceFragmentKey = getFieldValue(instanceGraph, 'fragment', documentManager)
  // const instanceDocumentManager = builderManager.$documents.getDocumentManager(instanceFragmentKey)

  console.log(layerKey)

  return null

  return (
    <FragmentDocumentProvider documentManager={instanceDocumentManager}>
      <InstanceProvider instanceLink={layerKey}>
        {render(
          layerKey,
          <animated.div data-key={layerKey} data-type={definition.nodes.FragmentInstance} style={cssStyles}>
            {/*<Fragment layerKey={instanceFragment} renderParents={[...renderParents, layerKey]} render={render} />*/}
          </animated.div>
        )}
      </InstanceProvider>
    </FragmentDocumentProvider>
  )
}
