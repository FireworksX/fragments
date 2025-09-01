import React, { FC } from 'react'
import styles from './styles.module.css'
import { usePropertiesTree } from '../hooks/usePropertiesTree'
import { Container } from '@/shared/ui/Container'
import { PropertyGenericCell } from '@/entities/fragment/PropertyGenericCell'
import { useFragmentProperties } from '@/shared/hooks/fragmentBuilder/useFragmentProperties'
import { Panel } from '@/shared/ui/Panel'
import { GraphValue, GraphValues } from '@graph-state/react'

interface PropertiesTreeProps {}

export const PropertiesTree: FC<PropertiesTreeProps> = () => {
  const { properties } = useFragmentProperties()

  return (
    <Panel className={styles.root}>
      {properties.map(prop => (
        <PropertyGenericCell key={prop?._id} propertyLink={prop} />
      ))}
    </Panel>
  )
}
