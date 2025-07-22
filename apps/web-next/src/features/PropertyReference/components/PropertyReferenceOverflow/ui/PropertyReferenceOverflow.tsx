import { FC } from 'react'
import { definition } from '@fragmentsx/definition'
import { Select } from '@/shared/ui/Select'
import { capitalize } from '@/shared/utils/capitalize'

interface PropertyReferenceOverflowProps {
  value: keyof typeof definition.overflow
  onChange(value: keyof typeof definition.overflow): void
}

export const PropertyReferenceOverflow: FC<PropertyReferenceOverflowProps> = ({ value, onChange }) => {
  return (
    <Select value={value} onChange={onChange}>
      {Object.values(definition.overflow).map(variant => (
        <option key={variant} value={variant}>
          {capitalize(variant)}
        </option>
      ))}
    </Select>
  )
}
