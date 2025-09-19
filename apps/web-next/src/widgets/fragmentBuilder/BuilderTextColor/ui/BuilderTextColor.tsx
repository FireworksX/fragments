import React, { FC, useContext } from 'react'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputSelect } from '@/shared/ui/InputSelect'
import { useBuilderTextColor } from '@/widgets/fragmentBuilder/BuilderTextColor/hooks/useBuilderTextColor'

interface BuilderTextColorProps {}

const BuilderTextColor: FC<BuilderTextColorProps> = () => {
  const color = useBuilderTextColor()

  return (
    <ControlRow
      title='Color'
      hasConnector={!color.disabled}
      variable={
        !color.isMixed
          ? {
              data: color.variableData,
              actions: color.actions,
              onReset: color.resetVariable,
              onClick: color.editVariable
            }
          : undefined
      }
    >
      <ControlRowWide>
        {color.isMixed ? (
          <InputSelect hasIcon onClick={color.onClick}>
            Mixed
          </InputSelect>
        ) : (
          <InputSelect color={color.value} onClick={color.onClick}>
            {color.value}
          </InputSelect>
        )}
      </ControlRowWide>
    </ControlRow>
  )
}

export default BuilderTextColor
