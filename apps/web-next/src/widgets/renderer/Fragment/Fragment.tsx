import { FC } from 'react'
import { GraphState } from '@graph-state/core'
import { useCurrentBreakpoint } from './hooks/useCurrentBreakpoint'
import { Frame } from '@/widgets/renderer/Frame/Frame'

export interface DocumentRenderer {
  documentManager: GraphState
}

export const Fragment: FC<DocumentRenderer> = ({ documentManager }) => {
  const { containerRef, currentBreakpointLink } = useCurrentBreakpoint(documentManager)

  return (
    <div ref={containerRef}>
      <Frame layerKey={currentBreakpointLink} />
    </div>
  )
}
