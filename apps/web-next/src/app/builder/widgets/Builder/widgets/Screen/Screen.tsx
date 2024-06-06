import { FC, PropsWithChildren, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import ScreenTitle from '@/app/builder/widgets/Builder/widgets/Screen/components/ScreenTitle/ScreenTitle'
import { useScreens } from '@/app/builder/widgets/Builder/hooks/useScreens'
import { BuilderContext } from '@/app/builder/widgets/Builder/BuilderContext'
import { useGraph, useGraphFields, useGraphStack } from '@graph-state/react'
import { LinkKey } from '@graph-state/core'
import { modalStore } from '@/app/store/modal.store'

interface BuilderScreenProps extends PropsWithChildren {
  screenKey: LinkKey
  className?: string
}

const Screen: FC<BuilderScreenProps> = ({ className, children, screenKey }) => {
  const { graphState } = useContext(BuilderContext)
  const [screenGraph] = useGraph(graphState, screenKey)
  const { screensValues, addScreen } = useScreens()
  const width = +screenGraph?.width
  const activeBreakpointWidths = screensValues.map(screen => screen?.width)

  return (
    <div className={cn(styles.root, className)} data-root-node style={{ minWidth: width }}>
      <ScreenTitle
        className={styles.title}
        name={screenGraph.name ?? screenGraph._id}
        activeWidths={activeBreakpointWidths}
        onClickBreakpoint={addScreen}
        onClickCustom={() => {
          modalStore.open('createCustomBreakpoint', {
            onAdd: (name, width) => {
              addScreen(name, width)
              close()
            }
          })
        }}
      />
      {children}
    </div>
  )
}

export default Screen
