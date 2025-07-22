import { FC } from 'react'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { animated } from '@react-spring/web'
import { booleanTabsSelectorItems } from '@/shared/data'
import { TabsSelector } from '@/shared/ui/TabsSelector'
import { BuilderControlRowProps } from '@/shared/ui/ControlRow/ui/default/ControlRow'
import { PropertyReference } from '@/features/PropertyReference'
import { Select } from '@/shared/ui/Select'
import { capitalize } from '@/shared/utils/capitalize'

interface InstancePropertyEnumProps extends Pick<BuilderControlRowProps, 'variable' | 'hasConnector'> {
  name: string
  propertyReference?: string
  cases?: { id: string; value: string }[]
  value: unknown
  className?: string
  onChange: (value: unknown) => void
}

const InstancePropertyEnum: FC<InstancePropertyEnumProps> = ({
  className,
  name,
  propertyReference,
  cases,
  value,
  onChange,
  ...controlRowProps
}) => {
  return (
    <ControlRow className={className} title={name} {...controlRowProps}>
      <ControlRowWide>
        {propertyReference ? (
          <PropertyReference type={propertyReference} value={value} onChange={onChange} />
        ) : (
          <Select value={value} onChange={onChange}>
            {cases?.map(item => (
              <option key={item.id} value={item.value}>
                {capitalize(item.value)}
              </option>
            ))}
          </Select>
        )}
      </ControlRowWide>
    </ControlRow>
  )
}

export default InstancePropertyEnum
