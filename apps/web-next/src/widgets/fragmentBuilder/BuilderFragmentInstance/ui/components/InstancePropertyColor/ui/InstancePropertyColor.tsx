import { FC } from 'react'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { animated } from '@react-spring/web'
import { InputSelect } from '@/shared/ui/InputSelect'
import { popoutsStore } from '@/shared/store/popouts.store'
import { popoutNames } from '@/shared/data'
import { objectToColorString } from '@fragmentsx/utils'
import { BuilderControlRowProps } from '@/shared/ui/ControlRow/ui/default/ControlRow'

interface InstancePropertyFillProps extends Pick<BuilderControlRowProps, 'variable' | 'hasConnector'> {
  name: string
  value: string
  className?: string
  onChange(value: string): void
}

const InstancePropertyColor: FC<InstancePropertyFillProps> = ({
  className,
  name,
  value,
  onChange,
  ...controlRowProps
}) => {
  return (
    <ControlRow className={className} title={name} {...controlRowProps}>
      <ControlRowWide>
        <InputSelect
          hasIcon
          color={value}
          onClick={() => {
            popoutsStore.open(popoutNames.colorPicker, {
              position: 'right',
              context: {
                value,
                onChange: v => {
                  onChange(objectToColorString(v))
                }
              }
            })
          }}
        >
          {value}
        </InputSelect>
      </ControlRowWide>
    </ControlRow>
  )
}

export default animated(InstancePropertyColor)
