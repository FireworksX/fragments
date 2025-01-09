import React, { FC, useContext, useMemo, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { POPOUT_TYPE, popoutsStore } from '@/shared/store/popouts.store'
import { useGraph } from '@graph-state/react'
import { TabsSelector, TabsSelectorItem } from '@/shared/ui/TabsSelector'
import { capitalize } from '@/shared/utils/capitalize'
import { popoutNames } from '@/shared/data'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputText, InputTextAnimated } from '@/shared/ui/InputText'
import { Textarea, TextareaAnimated } from '@/shared/ui/Textarea'
import { AnimatedVisible } from '@/shared/ui/AnimatedVisible'
import { to } from '@fragments/springs-factory'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'

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

const StackStringProperty: FC<StackStringVariableProps> = ({ className }) => {
  const { documentManager } = useBuilderDocument()
  const [popout] = useGraph(popoutsStore, `${POPOUT_TYPE}:${popoutNames.stackStringProperty}`)
  const context = popout?.context ?? {}

  const layerInvoker = useLayerInvoker(context?.propertyLink, ({ node, value, prevValue, key }) => {
    if (key === 'name') {
      node.rename(value)
    }

    if (key === 'displayStepper') {
      node.setDisplayStepper(value)
    }

    if (key === 'placeholder') {
      node.setPlaceholder(value)
    }

    if (['required', 'isTextarea', 'defaultValue'].includes(key)) {
      node[`set${capitalize(key)}`](value)
    }
  })

  const nameInvoker = layerInvoker('name')
  const requiredInvoker = layerInvoker('required')
  const placeholderInvoker = layerInvoker('placeholder')
  const displayTextAreaInvoker = layerInvoker('isTextarea')
  const defaultValueInvoker = layerInvoker('defaultValue')

  return (
    <div className={cn(styles.root, className)}>
      <ControlRow title='Name'>
        <ControlRowWide>
          <InputText value={nameInvoker.value} onChangeValue={nameInvoker.onChange} />
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
          <InputTextAnimated value={placeholderInvoker.value} onChangeValue={placeholderInvoker.onChange} />
        </ControlRowWide>
      </ControlRow>
      <ControlRow title='Default Value'>
        <ControlRowWide>
          <AnimatedVisible visible={displayTextAreaInvoker.value}>
            <TextareaAnimated value={defaultValueInvoker.value} onChangeValue={defaultValueInvoker.onChange} />
          </AnimatedVisible>
          <AnimatedVisible visible={to(displayTextAreaInvoker.value, v => !v)}>
            <InputTextAnimated value={defaultValueInvoker.value} onChangeValue={defaultValueInvoker.onChange} />
          </AnimatedVisible>
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

export default StackStringProperty
