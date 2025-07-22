import { FC } from 'react'
import { definition } from '@fragmentsx/definition'
import { Select } from '@/shared/ui/Select'
import { capitalize } from '@/shared/utils/capitalize'

interface PropertyReferenceLayerDistributeProps {
  value: keyof typeof definition.layerDistribute
  onChange(value: keyof typeof definition.overflow): void
}

export const PropertyReferenceLayerDistribute: FC<PropertyReferenceLayerDistributeProps> = ({ value, onChange }) => {
  return (
    <Select value={value} onChange={onChange}>
      {Object.values(definition.layerDistribute).map(variant => (
        <option key={variant} value={variant}>
          {capitalize(variant)}
        </option>
      ))}
    </Select>
  )
}
