import React, { FC, ReactNode, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { GraphState, LinkKey } from '@graph-state/core'
import { useBreakpoints } from '@/builder/views/BuilderEditable/widgets/DisplayBreakpoints/hooks/useBreakpoints'
import Breakpoint from '@/builder/views/BuilderEditable/widgets/DisplayBreakpoints/components/Breakpoint/Breakpoint'
import { useBuilderManager } from '@/builder/hooks/useBuilderManager'
import { modalStore } from '@/app/store/modal.store'
import { useRendererHandlers } from '@/builder/hooks/useRendererHandlers'
import { BuilderContext } from '@/builder/BuilderContext'

interface BuilderDisplayBreakpointsProps {
  renderer: (
    breakpointKey: LinkKey,
    props: {
      onClick?: any
      onMouseOver?: any
      onMouseLeave?: any
    }
  ) => ReactNode
  className?: string
}

const DisplayBreakpoints: FC<BuilderDisplayBreakpointsProps> = ({ className, renderer }) => {
  const { documentManager } = useContext(BuilderContext)
  const { breakpointKeys, addBreakpoint } = useBreakpoints()
  const { isEdit } = useBuilderManager()
  const { handleClick, mouseLeave, mouseOver } = useRendererHandlers(documentManager)

  const handleNewBreakpoint = (name, width) => {
    addBreakpoint(name, width)
  }

  const handleCustomBreakpoint = () => {
    modalStore.open('createCustomBreakpoint', {
      onAdd: (name, width) => {
        addBreakpoint(name, width)
        close()
      }
    })
  }

  return (
    <div className={cn(styles.root, className)}>
      {breakpointKeys.map(breakpointKey => (
        <Breakpoint
          key={breakpointKey}
          breakpointKey={breakpointKey}
          onClickBreakpoint={isEdit ? handleNewBreakpoint : undefined}
          onClickCustom={handleCustomBreakpoint}
        >
          {renderer(breakpointKey, { onClick: handleClick, onMouseOver: mouseOver, onMouseLeave: mouseLeave })}
        </Breakpoint>
      ))}
    </div>
  )
}

export default DisplayBreakpoints
