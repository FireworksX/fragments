import { FC } from 'react'
import { usePropertiesTree } from '../hooks/usePropertiesTree'
import { Container } from '@/shared/ui/Container'
import { PropertyGenericCell } from '@/entities/fragment/PropertyGenericCell'

interface PropertiesTreeProps {}

export const PropertiesTree: FC<PropertiesTreeProps> = () => {
  const { properties, editProperty } = usePropertiesTree()

  return (
    <Container gutterSize='medium'>
      {properties.map(prop => {
        return (
          <PropertyGenericCell key={prop.name} type={prop.type} onClick={() => editProperty(prop)}>
            {prop.name || prop?._id}
          </PropertyGenericCell>
        )
      })}
    </Container>
  )
}
