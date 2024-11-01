import { FC } from 'react'
import { GraphState } from '@graph-state/core'
import { animated } from '@react-spring/web'
import { useCurrentBreakpoint } from './hooks/useCurrentBreakpoint'
import { Frame } from '@/widgets/renderer/Frame/Frame'
import { extractAnimatableValues } from '@/shared/utils/extractAnimatableValues'

export interface DocumentRenderer {
  documentManager: GraphState
}

export const Fragment: FC<DocumentRenderer> = () => {
  const { currentBreakpoint, currentBreakpointKey, isCanvas, fragmentKey, fragmentRect } = useCurrentBreakpoint()

  return (
    <animated.div data-key={fragmentKey} style={{ ...extractAnimatableValues(fragmentRect, ['width', 'height']) }}>
      <Frame
        layerKey={currentBreakpointKey}
        {...(isCanvas
          ? currentBreakpoint
          : {
              ...currentBreakpoint,
              top: 0,
              left: 0
            })}
      />
    </animated.div>
  )
}
