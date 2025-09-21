import { FC, useContext, useMemo, useState } from 'react'
import cn from 'classnames'
import { definition } from '@fragmentsx/definition'
import styles from './styles.module.css'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { animatableValue } from '@/shared/utils/animatableValue'
import { TabsSelector, TabsSelectorItem } from '@/shared/ui/TabsSelector'
import { capitalize } from '@/shared/utils/capitalize'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputText } from '@/shared/ui/InputText'
import { InputNumber } from '@/shared/ui/InputNumber'
import { Stepper } from '@/shared/ui/Stepper'
import { Slider } from '@/shared/ui/Slider'
import { Button } from '@/shared/ui/Button'
import { popoutNames } from '@/shared/data'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { InputSelect } from '@/shared/ui/InputSelect'
import GoalIcon from '@/shared/icons/next/circle-dot.svg'
import { SearchInput } from '@/shared/ui/SearchInput'
import { Cell } from '@/shared/ui/Cell'
import PlusIcon from '@/shared/icons/next/plus.svg'
import { times } from '@fragmentsx/utils'
import { useStackGoals } from '@/features/popouts/StackGoals/hooks/useStackGoals'
import { Panel } from '@/shared/ui/Panel'
import { useCreateGoalMutation } from '@/shared/api/goals/CreateGoal.generated'
import { useProject } from '@/shared/hooks/useProject'
import { useStack } from '@/shared/hooks/useStack'

export interface StackCreateGoalContext {
  fragmentLink?: any
  onCreate?: (goal: any) => void
}

interface StackNumberVariableProps {
  className?: string
}

const controls: TabsSelectorItem[] = [
  {
    name: 'slider',
    label: 'Slider'
  },
  {
    name: 'stepper',
    label: 'Stepper'
  }
]

const requiredControls: TabsSelectorItem[] = [
  {
    name: true,
    label: 'Yes'
  },
  {
    name: false,
    label: 'No'
  }
]

export const StackCreateGoal: FC<StackNumberVariableProps> = ({ className }) => {
  const { projectSlug } = useProject()
  const stack = useStack()
  const context = stack.readContext(popoutNames.stackCreateGoal) ?? {}
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [createGoal, { loading }] = useCreateGoalMutation()

  const handleCreateGoal = async () => {
    const response = await createGoal({
      variables: {
        projectSlug,
        name,
        code
      }
    })

    context?.onCreate?.(response?.data?.createProjectGoal)
    setName('')
    setCode('')
  }

  return (
    <div className={cn(styles.root, className)}>
      <Panel
        footer={
          <Button stretched loading={loading} onClick={handleCreateGoal}>
            Create
          </Button>
        }
        withPaddingBottom
      >
        <ControlRow title='Name'>
          <ControlRowWide>
            <InputText placeholder='Goal name' value={name} onChangeValue={setName} />
          </ControlRowWide>
        </ControlRow>
        <ControlRow title='Code'>
          <ControlRowWide>
            <InputText placeholder='Goal ID' value={code} onChangeValue={setCode} />
          </ControlRowWide>
        </ControlRow>
      </Panel>
    </div>
  )
}
