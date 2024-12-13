import { FC } from 'react'
import { usePropertiesTree } from '../hooks/usePropertiesTree'
import { Container } from '@/shared/ui/Container'
import { PropertyGenericCell } from '@/entities/fragment/PropertyGenericCell'

interface PropertiesTreeProps {}

export const PropertiesTree: FC<PropertiesTreeProps> = () => {
  const { propertyLinks, editProperty } = usePropertiesTree()

  return (
    <div>
      {propertyLinks.map(prop => {
        return <PropertyGenericCell key={prop} propertyLink={prop} />
      })}
    </div>
  )
}
