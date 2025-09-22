import React, { FC, useContext } from 'react'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputText } from '@/shared/ui/InputText'
import { useBuilderTextContent } from '@/widgets/fragmentBuilder/BuilderTextContent/hooks/useBuilderTextContent'

interface BuilderTextColorProps {}

export const BuilderTextContent: FC<BuilderTextColorProps> = () => {
  const content = useBuilderTextContent()

  return (
    <ControlRow
      title='Content'
      value={content.value}
      hasConnector={!content.disabled}
      variable={{
        data: content.variableData,
        actions: content.actions,
        onReset: content.resetVariable,
        onClick: content.editVariable
      }}
    >
      <ControlRowWide>
        <InputText value={content.value} focusControlled onChangeValue={content.onChange} />
      </ControlRowWide>
    </ControlRow>
  )
}
