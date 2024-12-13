import { FC, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useBuilderFragmentInstance } from '../hooks/useBuilderFragmentInstance'
import { Panel } from '@/shared/ui/Panel'
import { BuilderSizeLocker } from '@/features/fragmentBuilder/BuilderSizeLocker'
import { ControlRow } from '@/shared/ui/ControlRow'
import { InputNumber } from '@/shared/ui/InputNumber'
import { Select } from '@/shared/ui/Select'
import { sizing, variableType } from '@fragments/plugin-fragment-spring'
import { to } from '@react-spring/web'

interface BuilderSizeProps {
  className?: string
}

const BuilderFragmentInstance: FC<BuilderSizeProps> = ({ className }) => {
  const { properties, title } = useBuilderFragmentInstance()

  return (
    <Panel className={cn(styles.root, className)} title={title} aside='Fragment'>
      {properties.map(property => {
        if (property.type === variableType.Number) {
          return (
            <ControlRow key={property.key} title={property.name}>
              <InputNumber />
            </ControlRow>
          )
        }
      })}
    </Panel>
  )
}

export default BuilderFragmentInstance
