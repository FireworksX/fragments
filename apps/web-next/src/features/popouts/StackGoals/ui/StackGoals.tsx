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
import { pick, times } from '@fragmentsx/utils'
import { useStackGoals } from '@/features/popouts/StackGoals/hooks/useStackGoals'
import { Dropdown } from '@/shared/ui/Dropdown'
import { DropdownOption } from '@/shared/ui/DropdownOption'
import InfoIcon from '@/shared/icons/next/info.svg'
import { DropdownGroup } from '@/shared/ui/DropdownGroup'
import { useStack } from '@/shared/hooks/useStack'

export interface StackGoalsContext {
  fragmentLink?: any
  activeGoalCode?: string
  onSelect?: (goal: any) => void
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

export const StackGoals: FC<StackNumberVariableProps> = ({ className }) => {
  const stack = useStack()
  const context = stack.readContext(popoutNames.stackGoals) ?? {}
  const { list } = useStackGoals()

  return (
    <div className={cn(styles.root, className)}>
      <SearchInput className={styles.search} mode='tiny' placeholder='Search' />

      <Cell
        className={styles.cellCreate}
        before={<PlusIcon />}
        onClick={() => {
          stack.open(popoutNames.stackCreateGoal, {
            onCreate: () => {
              stack.goPrev()
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
          description={
            <Dropdown
              trigger='mouseenter'
              options={
                <DropdownGroup>
                  <DropdownOption>{goal.code}</DropdownOption>
                </DropdownGroup>
              }
            >
              <InfoIcon />
            </Dropdown>
          }
          onClick={() => context?.onSelect?.({ goalId: goal.id, name: goal.name, code: goal.code })}
        >
          {goal.name}
        </Cell>
      ))}
    </div>
  )
}
