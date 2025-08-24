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
  const { properties, documentManager } = useFragmentProperties()

  return (
    <Panel className={styles.root}>
      <GraphValues graphState={documentManager} fields={properties}>
        {values =>
          values.map((prop, index) => {
            const key = properties.at(index)
            if (!!prop?.parent) return null
            return <PropertyGenericCell key={key} propertyLink={key} />
          })
        }
      </GraphValues>
    </Panel>
  )
}
