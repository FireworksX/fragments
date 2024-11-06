import { FC, useContext } from 'react'
import { GraphState, LinkKey } from '@graph-state/core'
import { animated } from '@react-spring/web'
import { useCurrentBreakpoint } from './hooks/useCurrentBreakpoint'
import { Frame } from '@/widgets/renderer/Frame/Frame'
import { extractAnimatableValues } from '@/shared/utils/extractAnimatableValues'
import { nodes } from '@fragments/plugin-state'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'

export interface DocumentRenderer {
  layerKey?: LinkKey
  documentManager: GraphState
}

export const FragmentInstance: FC<DocumentRenderer> = ({ layerKey }) => {
  const { documentManager } = useContext(BuilderContext)
  const [instanceGraph] = useGraph(documentManager, layerKey)
  const { currentBreakpoint, currentBreakpointKey, isCanvas } = useCurrentBreakpoint(
    documentManager?.resolve(layerKey)?.children?.at?.(0)
  )
  const cssStyles = instanceGraph?.toCss?.() ?? {}

  if (!currentBreakpoint) return null

  return (
    <animated.div data-key={layerKey} data-type={nodes.FragmentInstance} style={cssStyles}>
      {currentBreakpoint.children.map(childLink => (
        <Frame key={childLink} layerKey={childLink} />
      ))}
    </animated.div>
  )
}
