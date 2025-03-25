import { FC } from 'react'
import { SpringValue } from '@react-spring/web'
import { animatableValue } from '@/shared/utils/animatableValue'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { TabsSelector } from '@/shared/ui/TabsSelector'
import { booleanTabsSelectorItems } from '@/shared/data'

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
          items={booleanTabsSelectorItems}
          value={animatableValue(value)}
          onChange={({ name }) => onChange(name)}
        />
      </ControlRowWide>
    </ControlRow>
  )
}
