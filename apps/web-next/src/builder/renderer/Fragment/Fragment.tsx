import { FC } from 'react'
import { GraphState } from '@graph-state/core'
import { useGraphFields } from '@graph-state/react'
import { builderNodes } from '@fragments/fragments-plugin/performance'
import { useCurrentBreakpoint } from '@/builder/renderer/Fragment/hooks/useCurrentBreakpoint'
import { Frame } from '@/builder/renderer/Frame/Frame'

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
