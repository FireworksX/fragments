import { FC, PropsWithChildren, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useGraph, useGraphFields, useGraphStack } from '@graph-state/react'
import { GraphState, LinkKey } from '@graph-state/core'
import ScreenTitle from '@/builder/DisplayBreakpoints/components/ScreenTitle/ScreenTitle'
import { useScreens } from '@/builder/DisplayBreakpoints/hooks/useScreens'
import { BuilderContext } from '@/builder/BuilderContext'

interface BuilderScreenProps extends PropsWithChildren {
  screenKey: LinkKey
  className?: string
  mode?: 'preview' | 'edit'
  onClickScreen?: () => void
  onClickCustom?: () => void
}

const Screen: FC<BuilderScreenProps> = ({ className, children, screenKey, onClickScreen, onClickCustom }) => {
  const { documentManager } = useContext(BuilderContext)
  const [screenGraph] = useGraph(documentManager, screenKey)
  const { screensValues, addScreen } = useScreens(documentManager)
  const width = +screenGraph?.width
  const activeBreakpointWidths = screensValues.map(screen => screen?.width)

  return (
    <div className={cn(styles.root, className)} data-root-node style={{ minWidth: width }}>
      <ScreenTitle
        className={styles.title}
        name={screenGraph.name ?? screenGraph._id}
        activeWidths={activeBreakpointWidths}
        onClickScreen={onClickScreen}
        onClickCustom={onClickCustom}
      />
      {children}
    </div>
  )
}

export default Screen
