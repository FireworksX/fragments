import { FC, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useBuilderFragmentInstance } from '../hooks/useBuilderFragmentInstance'
import { Panel } from '@/shared/ui/Panel'
import { variableType } from '@fragments/plugin-fragment-spring'
import { InstancePropertyNumber } from './components/InstancePropertyNumber'
import { InstancePropertyString } from './components/InstancePropertyString'
import { InstancePropertyBoolean } from './components/InstancePropertyBoolean'
import { InstancePropertyGeneric } from './components/InstancePropertyGeneric'

interface BuilderSizeProps {
  className?: string
}

const BuilderFragmentInstance: FC<BuilderSizeProps> = ({ className }) => {
  const { properties, title } = useBuilderFragmentInstance()

  return (
    <Panel className={cn(styles.root, className)} title={title} aside={<div className={styles.aside}>Fragment</div>}>
      {properties.map(property => (
        <InstancePropertyGeneric key={property._id} property={property} />
      ))}
    </Panel>
  )
}

export default BuilderFragmentInstance
