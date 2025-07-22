import { FC } from 'react'
import { definition } from '@fragmentsx/definition'
import { TabsSelector } from '@/shared/ui/TabsSelector'
import { directions } from '@/widgets/fragmentBuilder/BuilderLayout/hooks/useBuilderLayout'
import { booleanTabsSelectorItems } from '@/shared/data'

interface PropertyReferenceLayerWrapProps {
  value: boolean
  onChange(value: boolean): void
}

export const PropertyReferenceLayerWrap: FC<PropertyReferenceLayerWrapProps> = ({ value, onChange }) => {
  return <TabsSelector items={booleanTabsSelectorItems} value={value} onChange={({ name }) => onChange(name)} />
}
