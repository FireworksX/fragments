import React, { FC } from 'react'
import styles from './styles.module.css'
import { usePropertiesTree } from '../hooks/usePropertiesTree'
import { Container } from '@/shared/ui/Container'
import { PropertyGenericCell } from '@/entities/fragment/PropertyGenericCell'
import { useFragmentProperties } from '@/shared/hooks/fragmentBuilder/useFragmentProperties'
import { Panel } from '@/shared/ui/Panel'

interface PropertiesTreeProps {}

export const PropertiesTree: FC<PropertiesTreeProps> = () => {
  const { properties } = useFragmentProperties()

  return (
    <Panel className={styles.root}>
      {properties.map(prop => {
        return <PropertyGenericCell key={prop} propertyLink={prop} />
      })}
    </Panel>
  )
}
