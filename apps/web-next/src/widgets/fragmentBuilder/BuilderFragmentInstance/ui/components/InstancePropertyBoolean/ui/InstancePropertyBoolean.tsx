import { FC } from 'react'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { animated } from '@react-spring/web'
import { booleanTabsSelectorItems } from '@/shared/data'
import { TabsSelector } from '@/shared/ui/TabsSelector'

interface InstancePropertyBooleanProps {
  name: string
  value: boolean
  className?: string
  onChange(value: boolean): void
}

const InstancePropertyBoolean: FC<InstancePropertyBooleanProps> = ({ className, name, value, onChange }) => {
  return (
    <ControlRow className={className} title={name}>
      <ControlRowWide>
        <TabsSelector items={booleanTabsSelectorItems} value={value} onChange={({ name }) => onChange(name)} />
      </ControlRowWide>
    </ControlRow>
  )
}

export default animated(InstancePropertyBoolean)
