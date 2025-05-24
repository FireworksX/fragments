import { FC, useContext, useMemo, useState } from 'react'
import cn from 'classnames'
import { definition } from '@fragmentsx/definition'
import styles from './styles.module.css'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { POPOUT_TYPE, popoutsStore } from '@/shared/store/popouts.store'
import { useGraph } from '@graph-state/react'
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
import { pick, times } from '@fragmentsx/utils'
import { useStackGoals } from '@/features/popouts/StackGoals/hooks/useStackGoals'

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

const StackGoals: FC<StackNumberVariableProps> = ({ className }) => {
  const [popout] = useGraph(popoutsStore, `${POPOUT_TYPE}:${popoutNames.stackGoals}`)
  const context = popout?.context ?? {}
  const { list } = useStackGoals()

  return (
    <div className={cn(styles.root, className)}>
      <SearchInput className={styles.search} mode='tiny' placeholder='Search' />

      <Cell
        className={styles.cellCreate}
        before={<PlusIcon />}
        onClick={() => {
          popoutsStore.open(popoutNames.stackCreateGoal, {
            context: {
              onCreate: () => {
                popoutsStore.goPrev()
              }
            }
          })
        }}
      >
        Create New
      </Cell>
      {list.map(goal => (
        <Cell
          key={goal.id}
          className={cn(styles.cell, { [styles.active]: context?.activeGoalCode === goal.code })}
          description={goal.code}
          onClick={() => context?.onSelect?.(pick(goal, 'name', 'code'))}
        >
          {goal.name}
        </Cell>
      ))}
    </div>
  )
}

export default StackGoals
