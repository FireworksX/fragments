import { FC } from 'react'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { animated } from '@react-spring/web'
import { InputSelect } from '@/shared/ui/InputSelect'
import { popoutNames } from '@/shared/data'
import { objectToColorString } from '@fragmentsx/utils'
import { BuilderControlRowProps } from '@/shared/ui/ControlRow/ui/default/ControlRow'
import { useStack } from '@/shared/hooks/useStack'

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
  const stack = useStack()

  return (
    <ControlRow className={className} title={name} {...controlRowProps}>
      <ControlRowWide>
        <InputSelect
          hasIcon
          color={value}
          onClick={() => {
            stack.open(
              popoutNames.colorPicker,
              {
                value,
                onChange: v => {
                  onChange(objectToColorString(v))
                }
              },
              {
                position: 'right'
              }
            )
          }}
        >
          {value}
        </InputSelect>
      </ControlRowWide>
    </ControlRow>
  )
}

export default animated(InstancePropertyColor)
