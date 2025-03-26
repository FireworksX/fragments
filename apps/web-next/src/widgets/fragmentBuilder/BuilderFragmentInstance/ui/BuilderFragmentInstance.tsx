import { FC, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useBuilderFragmentInstance } from '../hooks/useBuilderFragmentInstance'
import { Panel } from '@/shared/ui/Panel'
import { InstancePropertyNumber } from './components/InstancePropertyNumber'
import { InstancePropertyString } from './components/InstancePropertyString'
import { InstancePropertyBoolean } from './components/InstancePropertyBoolean'
import { InstancePropertyGeneric } from './components/InstancePropertyGeneric'

interface BuilderSizeProps {
  className?: string
}

const BuilderFragmentInstance: FC<BuilderSizeProps> = ({ className }) => {
  const { name, definition, instanceManager } = useBuilderFragmentInstance()

  return (
    <Panel className={cn(styles.root, className)} title={name} aside={<div className={styles.aside}>Fragment</div>}>
      {definition.map(property => (
        <InstancePropertyGeneric key={property} property={property} instanceManager={instanceManager} />
      ))}
    </Panel>
  )
}

export default BuilderFragmentInstance
