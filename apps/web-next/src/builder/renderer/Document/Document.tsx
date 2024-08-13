import { FC } from 'react'
import { GraphState } from '@graph-state/core'
import { useGraphFields } from '@graph-state/react'
import { builderNodes } from '@fragments/fragments-plugin/performance'
import { useCurrentBreakpoint } from '@/builder/renderer/Document/hooks/useCurrentBreakpoint'
import { Layer } from '@/builder/renderer/Layer/Layer'

export interface DocumentRenderer {
  documentManager: GraphState
}

export const Document: FC<DocumentRenderer> = ({ documentManager }) => {
  const { containerRef, currentBreakpointLink } = useCurrentBreakpoint(documentManager)

  return (
    <div ref={containerRef}>
      <Layer layerKey={currentBreakpointLink} />
    </div>
  )
}
