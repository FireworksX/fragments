import React, { FC, ReactNode, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { GraphState, LinkKey } from '@graph-state/core'
import { useBreakpoints } from '@/builder/DisplayBreakpoints/hooks/useBreakpoints'
import Breakpoint from '@/builder/DisplayBreakpoints/components/Breakpoint/Breakpoint'
import { useBuilderManager } from '@/builder/hooks/useBuilderManager'
import { modalStore } from '@/app/store/modal.store'
import { useRendererHandlers } from '@/builder/hooks/useRendererHandlers'
import { BuilderContext } from '@/builder/BuilderContext'

interface BuilderDisplayBreakpointsProps {
  renderer: (breakpointKey: LinkKey, onClick?: any) => ReactNode
  className?: string
}

const DisplayBreakpoints: FC<BuilderDisplayBreakpointsProps> = ({ className, renderer }) => {
  const { documentManager } = useContext(BuilderContext)
  const { breakpointKeys, addBreakpoint } = useBreakpoints()
  const { isEdit } = useBuilderManager()
  const { handleClick } = useRendererHandlers(documentManager)

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
      {breakpointKeys.map(screenKey => (
        <Breakpoint
          key={screenKey}
          screenKey={screenKey}
          onClickBreakpoint={isEdit ? handleNewBreakpoint : undefined}
          onClickCustom={handleCustomBreakpoint}
        >
          {renderer(screenKey, handleClick)}
        </Breakpoint>
      ))}
    </div>
  )
}

export default DisplayBreakpoints
