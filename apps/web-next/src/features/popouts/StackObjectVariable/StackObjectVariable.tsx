import React, { FC, useContext, useMemo, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import InputSelect from '@/app/components/InputSelect/InputSelect'
import Button from '@/app/components/Button'
import InputText from '@/app/components/InputText/InputText'
import Plus from '@/app/svg/plus.svg'
import ColorCell from '@/builder/components/ColorCell/ColorCell'
import { useBuilderAssetsColors } from '@/builder/views/BuilderEditable/widgets/BuilderAssets/hooks/useBuilderAssetsColors'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { isObject, omit } from '@fragmentsx/utils'
import { useBuilderSelection } from '@/builder/hooks/useBuilderSelection'
import { useDisplayColor } from '@/builder/hooks/useDisplayColor'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { isLinkKey } from '@graph-state/core'
import { POPOUT_TYPE, popoutsStore } from '@/shared/store/popouts.store'
import InputNumber from '@/app/components/InputNumber/InputNumber'
import Stepper from '@/app/components/Stepper/Stepper'
import Slider from '@/app/components/Slider/Slider'
import ControlRow from '@/builder/components/ControlRow/ControlRow'
import ControlRowWide from '@/builder/components/ControlRow/components/ControlRowWide/ControlRowWide'
import TabsSelector, { TabsSelectorItem } from '@/app/components/TabsSelector'
import { useGraph } from '@graph-state/react'
import { capitalize } from '@/app/utils/capitalize'
import { animatableValue } from '@/shared/utils/animatableValue'
import Dropdown from '@/app/components/Dropdown/Dropdown'
import SelectMimicry from '@/app/components/SelectMimicry/SelectMimicry'
import DropdownGroup from '@/app/components/Dropdown/components/DropdownGroup/DropdownGroup'
import DropdownOption from '@/app/components/Dropdown/components/DropdownOption/DropdownOption'
import Select from '@/app/components/Select/Select'
import { useBuilderVariables } from '@/builder/views/BuilderEditable/widgets/BuilderVariables/hooks/useBuilderVariables'
import { useBuilderVariablesDep } from '@/builder/views/BuilderEditable/widgets/BuilderVariables/hooks/useBuilderVariablesDep'
import { builderVariableType } from '@fragmentsx/fragments-plugin'
import { useStackObjectVariable } from '@/builder/StackCollector/components/variables/StackObjectVariable/hooks/useStackObjectVariable'
import { BuilderVariableCell } from '@/builder/views/BuilderEditable/widgets/BuilderVariables/components/BuilderVariableCell/BuilderVariableCell'
import Panel from '@/builder/components/Panel/Panel'
import { stackObjectFieldsVariableName } from '@/builder/StackCollector/components/variables/StackObjectFieldsVariable/StackObjectFieldsVariable'
import ArrowTopRightFill from '@/app/svg/fills/arrow-top-right-fill.svg'
import PanelHeadAside from '@/builder/components/PanelHeadAside/PanelHeadAside'
import { useStackObjectFieldsVariable } from './hooks/useStackObjectFieldsVariable'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'

export const stackObjectVariableName = 'stackObjectVariable'

interface StackObjectVariableProps {
  className?: string
}

const controls: TabsSelectorItem[] = [
  {
    name: 'slider',
    label: 'Slider'
  },
  {
    name: 'stepper',
    label: 'Stepper'
  }
]

const requiredControls: TabsSelectorItem[] = [
  {
    name: true,
    label: 'Yes'
  },
  {
    name: false,
    label: 'No'
  }
]

const StackObjectVariable: FC<StackObjectVariableProps> = ({ className }) => {
  const { documentManager } = useBuilderDocument()
  const [popout] = useGraph(popoutsStore, `${POPOUT_TYPE}:${stackObjectVariableName}`)
  const context = popout.context ?? {}
  const [variableGraph] = useGraph(documentManager, context?.variableKey)
  const { variables, dropdownRef, openVariable } = useStackObjectFieldsVariable(context?.variableKey)
  const fields = variableGraph.fields || []

  const layerInvoker = useLayerInvoker(context.variableKey, ({ node, value, prevValue, key }) => {
    if (key === 'name') {
      node.rename(value)
    }

    if (key === 'step') {
      node.setStep(
        value >= animatableValue(prevValue) ? animatableValue(prevValue) * 10 : animatableValue(prevValue) / 10
      )
    }

    if (key === 'displayStepper') {
      node.setDisplayStepper(value)
    }

    if (['required', 'min', 'max', 'defaultValue'].includes(key)) {
      node[`set${capitalize(key)}`](value)
    }
  })

  const nameInvoker = layerInvoker('name')
  const requiredInvoker = layerInvoker('required')

  return (
    <div className={cn(styles.root, className)}>
      <Panel>
        <ControlRow title='Name'>
          <ControlRowWide>
            <InputText {...nameInvoker} />
          </ControlRowWide>
        </ControlRow>
        <ControlRow title='Required'>
          <ControlRowWide>
            <TabsSelector
              items={requiredControls}
              value={requiredInvoker.value}
              onChange={({ name }) => requiredInvoker.onChange(name)}
            />
          </ControlRowWide>
        </ControlRow>
      </Panel>
      <Panel
        title='Fields'
        aside={
          <Dropdown
            trigger='click'
            appendTo='body'
            onCreate={instance => (dropdownRef.current = instance)}
            options={
              <DropdownGroup>
                {variables.map(variable => (
                  <DropdownOption key={variable.type} onClick={variable.createAndAppend}>
                    {variable.type}
                  </DropdownOption>
                ))}
              </DropdownGroup>
            }
          >
            <PanelHeadAside />
          </Dropdown>
        }
      >
        {fields.map(fieldLink => (
          <ControlRowWide key={fieldLink}>
            <BuilderVariableCell variableKey={fieldLink} onClick={() => openVariable(fieldLink)} />
          </ControlRowWide>
        ))}
      </Panel>
    </div>
  )
}

export default StackObjectVariable
