import { FC } from 'react'
import { usePropertiesTree } from '../hooks/usePropertiesTree'
import { Container } from '@/shared/ui/Container'
import { PropertyGenericCell } from '@/entities/fragment/PropertyGenericCell'
import { useFragmentProperties } from '@/shared/hooks/fragmentBuilder/useFragmentProperties'

interface PropertiesTreeProps {}

export const PropertiesTree: FC<PropertiesTreeProps> = () => {
  const { properties } = useFragmentProperties()

  return (
    <div>
      {properties.map(prop => {
        return <PropertyGenericCell key={prop} propertyLink={prop} />
      })}
    </div>
  )
}
