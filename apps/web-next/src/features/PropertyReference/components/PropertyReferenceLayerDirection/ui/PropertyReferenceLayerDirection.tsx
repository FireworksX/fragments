import { FC } from 'react'
import { definition } from '@fragmentsx/definition'
import { TabsSelector } from '@/shared/ui/TabsSelector'
import { directions } from '@/widgets/fragmentBuilder/BuilderLayout/hooks/useBuilderLayout'

interface PropertyReferenceLayerDirectionProps {
  value: keyof typeof definition.layerDirection
  onChange(value: keyof typeof definition.layerDirection): void
}

export const PropertyReferenceLayerDirection: FC<PropertyReferenceLayerDirectionProps> = ({ value, onChange }) => {
  return <TabsSelector items={directions} value={value} onChange={({ name }) => onChange(name)} />
}
