import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { SpringValue } from '@react-spring/web'
import ControlRow from '@/builder/components/ControlRow/ControlRow'
import InputNumber from '@/app/components/InputNumber/InputNumber'
import Stepper from '@/app/components/Stepper/Stepper'
import Slider from '@/app/components/Slider/Slider'
import ControlRowWide from '@/builder/components/ControlRow/components/ControlRowWide/ControlRowWide'
import TabsSelector from '@/app/components/TabsSelector'
import { tabsSelectorItemsBoolean } from '@/builder/data'

interface TransformNumberValueProps {
  value: SpringValue<number>
  className?: string
}

export const TransformBooleanValue: FC<TransformNumberValueProps> = ({ className, value }) => {
  return (
    <ControlRow title='Value'>
      <ControlRowWide>
        <TabsSelector items={tabsSelectorItemsBoolean} value={value} onChange={({ name }) => value.set(name)} />
      </ControlRowWide>
    </ControlRow>
  )
}
