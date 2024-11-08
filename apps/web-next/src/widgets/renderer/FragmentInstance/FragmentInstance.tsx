import { FC, useContext } from 'react'
import { GraphState, LinkKey } from '@graph-state/core'
import { animated, to } from '@react-spring/web'
import { nodes, sizing } from '@fragments/plugin-state'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { Fragment } from '@/widgets/renderer/Fragment/Fragment'

export interface DocumentRenderer {
  layerKey?: LinkKey
  documentManager: GraphState
}

export const FragmentInstance: FC<DocumentRenderer> = ({ layerKey }) => {
  const { documentManager } = useContext(BuilderContext)
  const [instanceGraph] = useGraph(documentManager, layerKey)
  const cssStyles = instanceGraph?.toCss?.() ?? {}
  const horizontal = instanceGraph?.resolveField('layoutSizingHorizontal')
  const vertical = instanceGraph?.resolveField('layoutSizingVertical')

  return (
    <animated.div data-key={layerKey} data-type={nodes.FragmentInstance} style={cssStyles}>
      <Fragment
        layerKey={instanceGraph?.fragment}
        style={{
          width: source =>
            to([horizontal, source], (hSizing, sourceValue) => (hSizing === sizing.Hug ? sourceValue : '100%')),
          height: source =>
            to([vertical, source], (wSizing, sourceValue) => (wSizing === sizing.Hug ? sourceValue : '100%'))
        }}
      />
    </animated.div>
  )
}
