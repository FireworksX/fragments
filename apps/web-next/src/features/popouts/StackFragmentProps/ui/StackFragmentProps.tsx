import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { popoutNames } from '@/shared/data'
import { InstancePropertyGeneric } from '@/widgets/fragmentBuilder/BuilderFragmentInstance/ui/components/InstancePropertyGeneric'
import { useStackFragmentProps } from '@/features/popouts/StackFragmentProps/hooks/useStackFragmentProps'
import { useStack } from '@/shared/hooks/useStack'

export interface StackFragmentPropsContext {
  fragmentLink?: any
  manager?: any
}

interface StackNumberVariableProps {
  className?: string
}

export const StackFragmentProps: FC<StackNumberVariableProps> = ({ className }) => {
  const stack = useStack()
  const context = stack.readContext(popoutNames.stackFragmentProps) ?? {}

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
