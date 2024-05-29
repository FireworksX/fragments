import React, { FC, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Screen from '@/app/builder/widgets/Builder/widgets/Screen/Screen'
import { FragmentsRender } from '@fragments/render-react'
import { Layer } from '@fragments/nodes'
import { BuilderContext } from '@/app/builder/widgets/Builder/BuilderContext'
import { useScreens } from '@/app/builder/widgets/Builder/hooks/useScreens'
import { useBuilderLayerRefs } from '@/app/builder/widgets/Builder/hooks/useBuilderLayerRefs'

interface BuilderDisplayBreakpointsProps {
  className?: string
}

const DisplayBreakpoints: FC<BuilderDisplayBreakpointsProps> = ({ className }) => {
  const { graphState } = useContext(BuilderContext)
  const { screensKeys } = useScreens()
  const { onClick } = useBuilderLayerRefs()

  return (
    <div className={cn(styles.root, className)}>
      {screensKeys.map(screenKey => (
        <Screen key={screenKey} screenKey={screenKey}>
          <FragmentsRender FragmentNode={Layer} graphState={graphState} layerKey={screenKey} onClick={onClick} />
        </Screen>
      ))}
    </div>
  )
}

export default DisplayBreakpoints
