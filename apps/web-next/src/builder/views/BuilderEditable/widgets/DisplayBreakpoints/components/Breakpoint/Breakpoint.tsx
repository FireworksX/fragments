import { FC, PropsWithChildren, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useGraph, useGraphFields, useGraphStack } from '@graph-state/react'
import { Graph, GraphState, LinkKey } from '@graph-state/core'
import BreakpointTitle from '@/builder/views/BuilderEditable/widgets/DisplayBreakpoints/components/BreakpointTitle/BreakpointTitle'
import { useBreakpoints } from '@/builder/views/BuilderEditable/widgets/DisplayBreakpoints/hooks/useBreakpoints'
import { BuilderContext } from '@/builder/BuilderContext'
import { animated, to } from '@react-spring/web'

interface BuilderBreakpointProps extends PropsWithChildren {
  breakpoint: Graph
  className?: string
  mode?: 'preview' | 'edit'
  onClickBreakpoint?: (breakpoint) => void
  onClickCustom?: () => void
}

const Breakpoint: FC<BuilderBreakpointProps> = ({
  className,
  children,
  breakpoint,
  onClickBreakpoint,
  onClickCustom
}) => {
  const { documentManager } = useContext(BuilderContext)
  const { breakpointValues, addBreakpoint } = useBreakpoints(documentManager)
  const width = breakpoint?.width
  const activeBreakpointWidths = breakpointValues.map(bp => bp?.width)

  return (
    <animated.div className={cn(styles.root, className)} data-root-node style={{ minWidth: width }}>
      <BreakpointTitle
        className={styles.title}
        name={breakpoint.name ?? breakpoint._id}
        activeWidths={activeBreakpointWidths}
        onClickBreakpoint={onClickBreakpoint}
        onClickCustom={onClickCustom}
      />
      {children}
    </animated.div>
  )
}

export default Breakpoint
