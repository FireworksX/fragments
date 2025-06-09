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

const StackFragmentProps: FC<StackNumberVariableProps> = ({ className }) => {
  const [popout] = useGraph(popoutsStore, `${POPOUT_TYPE}:${popoutNames.stackFragmentProps}`)
  const context = popout?.context ?? {}
  const { definitions, manager } = useStackFragmentProps(context)

  return (
    <div className={cn(styles.root, className)}>
      {definitions.map(def => (
        <InstancePropertyGeneric value={def.value} property={def.link} manager={manager} onChange={def.setValue} />
      ))}
    </div>
  )
}

export default StackFragmentProps
