import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { POPOUT_TYPE, popoutsStore } from '@/shared/store/popouts.store'
import { useGraph } from '@graph-state/react'
import { popoutNames } from '@/shared/data'
import { InstancePropertyGeneric } from '@/widgets/fragmentBuilder/BuilderFragmentInstance/ui/components/InstancePropertyGeneric'
import { useStackFragmentProps } from '@/features/popouts/StackFragmentProps/hooks/useStackFragmentProps'

interface StackNumberVariableProps {
  className?: string
}

export const StackFragmentProps: FC<StackNumberVariableProps> = ({ className }) => {
  const [popout] = useGraph(popoutsStore, `${POPOUT_TYPE}:${popoutNames.stackFragmentProps}`, { deep: true })
  const context = popout?.context ?? {}

  const { definitions, manager } = useStackFragmentProps(context)

  return (
    <div className={cn(styles.root, className)}>
      {definitions.map(def => (
        <InstancePropertyGeneric
          key={def}
          value={def.value}
          property={def.link}
          manager={manager}
          variable={{
            // link: variableLink,
            data: def.variable.data,
            actions: def.variable.actions
            // onClick: editVariable,
            // onReset: resetVariable
          }}
          hasConnector={def.hasConnector}
          onChange={def.setValue}
        />
      ))}
    </div>
  )
}
