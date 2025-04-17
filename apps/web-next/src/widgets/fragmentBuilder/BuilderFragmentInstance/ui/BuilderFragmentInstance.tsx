import { FC, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useBuilderFragmentInstance } from '../hooks/useBuilderFragmentInstance'
import { Panel } from '@/shared/ui/Panel'
import { InstancePropertyNumber } from './components/InstancePropertyNumber'
import { InstancePropertyString } from './components/InstancePropertyString'
import { InstancePropertyBoolean } from './components/InstancePropertyBoolean'
import { InstancePropertyGeneric } from './components/InstancePropertyGeneric'
import { Button } from '@/shared/ui/Button'
import { useBuilder } from '@/shared/hooks/fragmentBuilder/useBuilder'

interface BuilderSizeProps {
  className?: string
}

// const Control = ({property, manager}) => {
//   const [] = use
//
//   return <InstancePropertyGeneric key={property} property={property} manager={manager} />
//
// }

const BuilderFragmentInstance: FC<BuilderSizeProps> = ({ className }) => {
  const { name, definition, instanceManager, instanceFragmentId } = useBuilderFragmentInstance()
  const { openFragment } = useBuilder()

  return (
    <Panel className={cn(styles.root, className)} title={name} aside={<div className={styles.aside}>Fragment</div>}>
      {definition.map(property => (
        <InstancePropertyGeneric
          key={property.link}
          property={property.link}
          value={property.value}
          manager={instanceManager}
          onChange={property.setValue}
        />
      ))}

      <Button className={styles.edit} mode='secondary' stretched onClick={() => openFragment(instanceFragmentId)}>
        Edit Fragment
      </Button>
    </Panel>
  )
}

export default BuilderFragmentInstance
