import { FC } from 'react'
import { BoxSide } from '@/shared/ui/BoxSizingSides'
import { ControlRow } from '@/shared/ui/ControlRow'
import { ControlRowWide } from '@/shared/ui/ControlRow'
import { InputGroup } from '@/shared/ui/InputGroup'
import { InputNumber } from '@/shared/ui/InputNumber'
import { animated } from '@react-spring/web'

interface BuilderSidesInputProps {
  values: [number, number, number, number]
  className?: string
  focusSide(sideIndex?: number): void
  onChange(sideIndex: number, value: number): void
}

export const BuilderSidesInput: FC<BuilderSidesInputProps> = ({ className, values, focusSide, onChange }) => (
  <ControlRow className={className}>
    <ControlRowWide>
      <InputGroup>
        {values.map((value, index) => (
          <InputNumber
            key={index}
            value={value}
            withoutTicker={true}
            onChange={value => onChange(index, value)}
            onFocus={() => focusSide(index)}
            onBlur={() => focusSide(undefined)}
          />
        ))}
      </InputGroup>
    </ControlRowWide>
  </ControlRow>
)
