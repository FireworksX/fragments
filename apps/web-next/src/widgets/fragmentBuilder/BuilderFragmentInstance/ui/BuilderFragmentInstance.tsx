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
import { InstancePropertyWithScopes } from '@/widgets/fragmentBuilder/BuilderFragmentInstance/ui/widgets/InstancePropertyWithScopes'

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
  const { name, definition, instanceManager, instanceFragmentId, parentManager } = useBuilderFragmentInstance()
  const { openFragment } = useBuilder()

  return (
    <Panel className={cn(styles.root, className)} title={name} aside={<div className={styles.aside}>Fragment</div>}>
      {definition.map(def => (
        <InstancePropertyWithScopes
          key={def.link}
          property={def.link}
          value={def.value}
          manager={instanceManager}
          parentManager={parentManager}
          // variable={{
          //   // link: variableLink,
          //   data: def.variable.data,
          //   actions: def.variable.actions
          //   // onClick: editVariable,
          //   // onReset: resetVariable
          // }}
          hasConnector={def.hasConnector}
          onChange={def.setValue}
        />
      ))}

      <Button className={styles.edit} mode='secondary' stretched onClick={() => openFragment(instanceFragmentId)}>
        Edit Fragment
      </Button>
    </Panel>
  )
}

export default BuilderFragmentInstance
