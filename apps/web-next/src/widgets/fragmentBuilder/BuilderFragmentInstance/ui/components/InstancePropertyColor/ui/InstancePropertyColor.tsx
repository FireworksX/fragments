import { FC } from 'react'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { animated } from '@react-spring/web'
import { InputSelect } from '@/shared/ui/InputSelect'
import { popoutsStore } from '@/shared/store/popouts.store'
import { popoutNames } from '@/shared/data'
import { objectToColorString } from '@fragmentsx/utils'

interface InstancePropertyFillProps {
  name: string
  value: string
  className?: string
  onChange(value: string): void
}

const InstancePropertyColor: FC<InstancePropertyFillProps> = ({ className, name, value, onChange }) => {
  return (
    <ControlRow className={className} title={name}>
      <ControlRowWide>
        <InputSelect
          hasIcon
          color={value}
          onClick={() => {
            popoutsStore.open(popoutNames.colorPicker, {
              initial: true,
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
