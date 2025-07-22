import { FC, memo } from 'react'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { Select } from '@/shared/ui/Select'
import { capitalize } from '@/shared/utils/capitalize'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { definition } from '@fragmentsx/definition'
import { useLayerPropertyValue } from '@/shared/hooks/fragmentBuilder/useLayerPropertyVariable'

interface BuilderOverflowControlProps {
  className?: string
}

const overflowOptions = Object.keys(definition.overflow)

export const BuilderOverflowControl: FC<BuilderOverflowControlProps> = memo(({ className }) => {
  const [value, setValue, valueInfo] = useLayerValue('overflow')
  const { disabled, actions, variableLink, resetVariable, editVariable } = useLayerPropertyValue('overflow')

  return (
    <ControlRow
      title='Overflow'
      className={className}
      override={{
        isOverride: valueInfo.isOverride,
        onRestOverride: valueInfo.resetOverride
      }}
      hasConnector={!disabled}
      variable={{
        link: variableLink,
        actions,
        onClick: editVariable,
        onReset: resetVariable
      }}
    >
      <ControlRowWide>
        <Select value={value} onChange={setValue}>
          {overflowOptions.map(value => (
            <option key={value} value={value}>
              {capitalize(value)}
            </option>
          ))}
        </Select>
      </ControlRowWide>
    </ControlRow>
  )
})
