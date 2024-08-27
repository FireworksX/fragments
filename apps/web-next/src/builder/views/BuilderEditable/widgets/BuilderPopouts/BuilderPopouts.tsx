import React, { createContext, FC } from 'react'
import cn from 'classnames'
import { useGraph } from '@graph-state/react'
import styles from './styles.module.css'
import StackCollector from '@/builder/StackCollector/StackCollector'
import StackPanelBorder from '@/builder/StackCollector/components/StackPanelBorder/StackPanelBorder'
import StackPanelFill from '@/builder/StackCollector/components/StackPanelFill/StackPanelFill'
import StackPanelColorPicker from '@/builder/StackCollector/components/StackPanelColorPicker/StackPanelColorPicker'
import StackPanelCreateColor from '@/builder/StackCollector/components/StackPanelCreateColor/StackPanelCreateColor'
import StackPanelCssOverride from '@/builder/StackCollector/components/StackPanelCssOverride/StackPanelCssOverride'
import StackPanelCssOverrideList from '@/builder/StackCollector/components/StackPanelCssOverrideList/StackPanelCssOverideList'
import StackLoopEffect from '@/builder/StackCollector/components/StackLoopEffect/StackLoopEffect'
import { popoutsStore } from '@/app/store/popouts.store'
import StackNumberVariable, {
  stackNumberVariableName,
  stackVariableName
} from '@/builder/StackCollector/components/variables/StackNumberVariable/StackNumberVariable'
import StackBooleanVariable, {
  stackBooleanVariableName
} from '@/builder/StackCollector/components/variables/StackBooleanVariable/StackBooleanVariable'
import StackObjectVariable, {
  stackObjectVariableName
} from '@/builder/StackCollector/components/variables/StackObjectVariable/StackObjectVariable'
import StackStringVariable, {
  stackStringVariableName
} from '@/builder/StackCollector/components/variables/StackStringVariable/StackStringVariable'
import StackVariableTransform, {
  stackVariableTransformName
} from '@/builder/StackCollector/components/variables/StackVariableTransform/StackVariableTransform'

interface BuilderPopoutsProps {
  className?: string
}

export const BuilderPopouts: FC<BuilderPopoutsProps> = ({ className }) => {
  const [currentPopout] = useGraph(popoutsStore, popoutsStore.getCurrent())

  return (
    <div
      className={cn(className, styles.root, {
        [styles.left]: currentPopout?.position === 'left'
      })}
    >
      <StackCollector>
        <StackPanelBorder name='border' title='Border' />
        <StackPanelFill name='fill' title='Fill' />
        <StackPanelColorPicker name='colorPicker' title='Color' />
        {/*/!*<StackPanelFonts name='fonts' title='Fonts' />*!/*/}
        <StackPanelCreateColor name='createColor' title='New color style' />
        <StackPanelCssOverride name='cssOverride' title='CSS override' />
        {/*<StackPanelCssOverrideList name='cssOverrideList' title='CSS overrides' />*/}
        {/*<StackLoopEffect name='loopEffect' title='Loop Effect' />*/}

        <StackNumberVariable name={stackNumberVariableName} title='Number' />
        <StackBooleanVariable name={stackBooleanVariableName} title='Boolean' />
        <StackObjectVariable name={stackObjectVariableName} title='Object' />
        <StackStringVariable name={stackStringVariableName} title='String' />
        <StackVariableTransform name={stackVariableTransformName} title='Transform' />
      </StackCollector>
    </div>
  )
}
