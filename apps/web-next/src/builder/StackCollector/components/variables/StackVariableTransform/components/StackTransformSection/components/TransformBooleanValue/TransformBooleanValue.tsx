import { FC } from 'react'
import { SpringValue } from '@react-spring/web'
import ControlRow from '@/builder/components/ControlRow/ControlRow'
import ControlRowWide from '@/builder/components/ControlRow/components/ControlRowWide/ControlRowWide'
import TabsSelector from '@/app/components/TabsSelector'
import { tabsSelectorItemsBoolean } from '@/builder/data'
import { animatableValue } from '@/builder/utils/animatableValue'

interface TransformNumberValueProps {
  className?: string
  value: SpringValue<boolean> | boolean
  onChange(next: boolean): void
}

export const TransformBooleanValue: FC<TransformNumberValueProps> = ({ className, value, onChange }) => {
  return (
    <ControlRow title='Value'>
      <ControlRowWide>
        <TabsSelector
          items={tabsSelectorItemsBoolean}
          value={animatableValue(value)}
          onChange={({ name }) => onChange(name)}
        />
      </ControlRowWide>
    </ControlRow>
  )
}
