import React, { FC, useContext, useMemo, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import InputSelect from '@/app/components/InputSelect/InputSelect'
import Button from '@/app/components/Button'
import InputText from '@/app/components/InputText/InputText'
import Plus from '@/app/svg/plus.svg'
import ColorCell from '@/builder/components/ColorCell/ColorCell'
import { useBuilderAssetsColors } from '@/builder/views/BuilderEditable/widgets/BuilderAssets/hooks/useBuilderAssetsColors'
import { BuilderContext } from '@/builder/BuilderContext'
import { isObject, omit } from '@fragments/utils'
import { useBuilderSelection } from '@/builder/hooks/useBuilderSelection'
import { useDisplayColor } from '@/builder/hooks/useDisplayColor'
import { useLayerInvoker } from '@/builder/hooks/useLayerInvoker'
import { isLinkKey } from '@graph-state/core'
import { POPOUT_TYPE, popoutsStore } from '@/app/store/popouts.store'
import InputNumber from '@/app/components/InputNumber/InputNumber'
import Stepper from '@/app/components/Stepper/Stepper'
import Slider from '@/app/components/Slider/Slider'
import ControlRow from '@/builder/components/ControlRow/ControlRow'
import ControlRowWide from '@/builder/components/ControlRow/components/ControlRowWide/ControlRowWide'
import TabsSelector, { TabsSelectorItem } from '@/app/components/TabsSelector'
import { useGraph } from '@graph-state/react'
import { capitalize } from '@/app/utils/capitalize'
import { animatableValue } from '@/builder/utils/animatableValue'
import Dropdown from '@/app/components/Dropdown/Dropdown'
import SelectMimicry from '@/app/components/SelectMimicry/SelectMimicry'
import DropdownGroup from '@/app/components/Dropdown/components/DropdownGroup/DropdownGroup'
import DropdownOption from '@/app/components/Dropdown/components/DropdownOption/DropdownOption'
import Select from '@/app/components/Select/Select'
import { useBuilderVariables } from '@/builder/views/BuilderEditable/widgets/BuilderVariables/hooks/useBuilderVariables'
import { useBuilderVariablesDep } from '@/builder/views/BuilderEditable/widgets/BuilderVariables/hooks/useBuilderVariablesDep'
import { builderVariableType } from '@fragments/fragments-plugin'
import { useStackObjectVariable } from '@/builder/StackCollector/components/StackObjectVariable/hooks/useStackObjectVariable'
import { BuilderVariableCell } from '@/builder/views/BuilderEditable/widgets/BuilderVariables/components/BuilderVariableCell/BuilderVariableCell'
import Panel from '@/builder/components/Panel/Panel'
import { stackObjectFieldsVariableName } from '@/builder/StackCollector/components/StackObjectFieldsVariable/StackObjectFieldsVariable'
import ArrowTopRightFill from '@/app/svg/arrow-top-right-fill.svg'
import Textarea from '@/app/components/Textarea/Textarea'

export const stackStringVariableName = 'stackStringVariable'

interface StackStringVariableProps {
  className?: string
}

const controls: TabsSelectorItem[] = [
  {
    name: true,
    label: 'Yes'
  },
  {
    name: false,
    label: 'No'
  }
]

const StackStringVariable: FC<StackStringVariableProps> = ({ className }) => {
  const { documentManager } = useContext(BuilderContext)
  const [popout] = useGraph(popoutsStore, `${POPOUT_TYPE}:${stackStringVariableName}`)
  const context = popout.context ?? {}
  const [variableGraph] = useGraph(documentManager, context?.variableKey)
  const fields = variableGraph?.fields || []

  const layerInvoker = useLayerInvoker(context.variableKey, ({ node, value, prevValue, key }) => {
    if (key === 'name') {
      node.rename(value)
    }

    if (key === 'displayStepper') {
      node.setDisplayStepper(value)
    }

    if (['required', 'placeholder', 'displayTextArea', 'defaultValue'].includes(key)) {
      node[`set${capitalize(key)}`](value)
    }
  })

  const nameInvoker = layerInvoker('name')
  const requiredInvoker = layerInvoker('required')
  const placeholderInvoker = layerInvoker('placeholder')
  const displayTextAreaInvoker = layerInvoker('displayTextArea')
  const defaultValueInvoker = layerInvoker('defaultValue')

  return (
    <div className={cn(styles.root, className)}>
      <ControlRow title='Name'>
        <ControlRowWide>
          <InputText {...nameInvoker} />
        </ControlRowWide>
      </ControlRow>
      <ControlRow title='Required'>
        <ControlRowWide>
          <TabsSelector
            items={controls}
            value={requiredInvoker.value}
            onChange={({ name }) => requiredInvoker.onChange(name)}
          />
        </ControlRowWide>
      </ControlRow>
      <ControlRow title='Placeholder'>
        <ControlRowWide>
          <InputText {...placeholderInvoker} />
        </ControlRowWide>
      </ControlRow>
      <ControlRow title='Default Value'>
        <ControlRowWide>
          {displayTextAreaInvoker.value ? (
            <Textarea {...defaultValueInvoker} />
          ) : (
            <InputText {...defaultValueInvoker} />
          )}
        </ControlRowWide>
      </ControlRow>
      <ControlRow title='Textarea'>
        <ControlRowWide>
          <TabsSelector
            items={controls}
            value={displayTextAreaInvoker.value}
            onChange={({ name }) => displayTextAreaInvoker.onChange(name)}
          />
        </ControlRowWide>
      </ControlRow>
    </div>
  )
}

export default StackStringVariable
