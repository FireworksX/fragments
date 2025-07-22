import { FC } from 'react'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { animated } from '@react-spring/web'
import { booleanTabsSelectorItems } from '@/shared/data'
import { TabsSelector } from '@/shared/ui/TabsSelector'
import { BuilderControlRowProps } from '@/shared/ui/ControlRow/ui/default/ControlRow'

interface InstancePropertyBooleanProps extends Pick<BuilderControlRowProps, 'variable' | 'hasConnector'> {
  name: string
  value: boolean
  className?: string
  onChange(value: boolean): void
}

const InstancePropertyBoolean: FC<InstancePropertyBooleanProps> = ({
  className,
  name,
  value,
  onChange,
  ...controlRowProps
}) => {
  return (
    <ControlRow className={className} title={name} {...controlRowProps}>
      <ControlRowWide>
        <TabsSelector items={booleanTabsSelectorItems} value={value} onChange={({ name }) => onChange(name)} />
      </ControlRowWide>
    </ControlRow>
  )
}

export default animated(InstancePropertyBoolean)
