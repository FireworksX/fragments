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
import { useStackObjectFieldsVariable } from './hooks/useStackObjectFieldsVariable'

export const stackObjectFieldsVariableName = 'stackObjectFieldsVariable'

interface StackObjectVariableProps {
  className?: string
}

const types = Object.keys(builderVariableType)

const StackObjectFieldsVariable: FC<StackObjectVariableProps> = ({ className }) => {
  const { documentManager } = useContext(BuilderContext)
  const [popout] = useGraph(popoutsStore, `${POPOUT_TYPE}:${stackObjectFieldsVariableName}`)
  const context = popout.context ?? {}
  const [variableGraph] = useGraph(documentManager, context?.variableKey)
  const { createField, dropdownRef, openVariable } = useStackObjectFieldsVariable(context?.variableKey)
  const fields = variableGraph.fields || []

  return (
    <div className={cn(styles.root, className)}>
      {fields.map(fieldLink => (
        <ControlRowWide key={fieldLink}>
          <BuilderVariableCell variableKey={fieldLink} onClick={() => openVariable(fieldLink)} />
        </ControlRowWide>
      ))}
      <Dropdown
        trigger='click'
        appendTo='body'
        onCreate={instance => (dropdownRef.current = instance)}
        options={
          <DropdownGroup>
            {types.map(type => (
              <DropdownOption onClick={e => createField(e, type)}>{type}</DropdownOption>
            ))}
            <DropdownOption
              onClick={e => {
                createField(e, builderVariableType.Number)
              }}
            >
              Number
            </DropdownOption>
            <DropdownOption>Boolean</DropdownOption>
            <DropdownOption>Object</DropdownOption>
          </DropdownGroup>
        }
      >
        <Button className={cn({ [styles.withMargin]: fields?.length > 0 })} mode='secondary' stretched>
          Add
        </Button>
      </Dropdown>
    </div>
  )
}

export default StackObjectFieldsVariable
