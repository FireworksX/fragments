import { FC } from 'react'
import { definition } from '@fragmentsx/definition'
import { TabsSelector } from '@/shared/ui/TabsSelector'
import { aligns } from '@/widgets/fragmentBuilder/BuilderLayout/hooks/useBuilderLayout'

interface PropertyReferenceLayerAlignProps {
  value: keyof typeof definition.layerDirection
  onChange(value: keyof typeof definition.layerDirection): void
}

export const PropertyReferenceLayerAlign: FC<PropertyReferenceLayerAlignProps> = ({ value, onChange }) => {
  return <TabsSelector items={aligns} value={value} onChange={({ name }) => onChange(name)} />
}
