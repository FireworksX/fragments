import React, { FC, ReactNode, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { GraphState, LinkKey } from '@graph-state/core'
import { useScreens } from '@/builder/DisplayBreakpoints/hooks/useScreens'
import Screen from '@/builder/DisplayBreakpoints/components/Screen/Screen'
import { useBuilderManager } from '@/builder/hooks/useBuilderManager'
import { modalStore } from '@/app/store/modal.store'

interface BuilderDisplayBreakpointsProps {
  renderer: (screenKey: LinkKey) => ReactNode
  className?: string
}

const DisplayBreakpoints: FC<BuilderDisplayBreakpointsProps> = ({ className, renderer }) => {
  const { screensKeys, addScreen } = useScreens()
  const { isEdit } = useBuilderManager()

  const handleNewScreen = (name, width) => {
    addScreen(name, width)
  }

  const handleCustomBreakpoint = () => {
    modalStore.open('createCustomBreakpoint', {
      onAdd: (name, width) => {
        addScreen(name, width)
        close()
      }
    })
  }

  return (
    <div className={cn(styles.root, className)}>
      {screensKeys.map(screenKey => (
        <Screen
          key={screenKey}
          screenKey={screenKey}
          onClickScreen={isEdit ? handleNewScreen : undefined}
          onClickCustom={handleCustomBreakpoint}
        >
          {renderer(screenKey)}
        </Screen>
      ))}
    </div>
  )
}

export default DisplayBreakpoints
