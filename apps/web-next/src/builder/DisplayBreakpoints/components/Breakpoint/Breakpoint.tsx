import { FC, PropsWithChildren, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useGraph, useGraphFields, useGraphStack } from '@graph-state/react'
import { GraphState, LinkKey } from '@graph-state/core'
import BreakpointTitle from '@/builder/DisplayBreakpoints/components/BreakpointTitle/BreakpointTitle'
import { useBreakpoints } from '@/builder/DisplayBreakpoints/hooks/useBreakpoints'
import { BuilderContext } from '@/builder/BuilderContext'

interface BuilderBreakpointProps extends PropsWithChildren {
  screenKey: LinkKey
  className?: string
  mode?: 'preview' | 'edit'
  onClickBreakpoint?: (breakpoint) => void
  onClickCustom?: () => void
}

const Breakpoint: FC<BuilderBreakpointProps> = ({
  className,
  children,
  screenKey,
  onClickBreakpoint,
  onClickCustom
}) => {
  const { documentManager } = useContext(BuilderContext)
  const [screenGraph] = useGraph(documentManager, screenKey)
  const { breakpointValues, addBreakpoint } = useBreakpoints(documentManager)
  const width = +screenGraph?.width
  const activeBreakpointWidths = breakpointValues.map(screen => screen?.width)

  return (
    <div className={cn(styles.root, className)} data-root-node style={{ minWidth: width }}>
      <BreakpointTitle
        className={styles.title}
        name={screenGraph.name ?? screenGraph._id}
        activeWidths={activeBreakpointWidths}
        onClickBreakpoint={onClickBreakpoint}
        onClickCustom={onClickCustom}
      />
      {children}
    </div>
  )
}

export default Breakpoint
