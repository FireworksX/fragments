import { FC } from 'react'
import { BoxSide } from '@/shared/ui/BoxSizingSides'
import { ControlRow } from '@/shared/ui/ControlRow'
import { ControlRowWide } from '@/shared/ui/ControlRow'
import { InputGroup } from '@/shared/ui/InputGroup'
import { InputNumber } from '@/shared/ui/InputNumber'
import { animated } from '@react-spring/web'

interface BuilderLayoutPaddingsProps {
  values: {
    top: number
    right: number
    bottom: number
    left: number
  }
  className?: string
  focusSide(side?: BoxSide): void
  onChange(side: BoxSide, value: number): void
}

const BuilderLayoutPaddings: FC<BuilderLayoutPaddingsProps> = ({ className, values, focusSide, onChange }) => (
  <ControlRow>
    <ControlRowWide>
      <InputGroup>
        <InputNumber
          value={values.top}
          withoutTicker={true}
          onChange={value => onChange('top', value)}
          onFocus={() => focusSide('top')}
          onBlur={() => focusSide(undefined)}
        />
        <InputNumber
          value={values.right}
          withoutTicker={true}
          onChange={value => onChange('right', value)}
          onFocus={() => focusSide('right')}
          onBlur={() => focusSide(undefined)}
        />
        <InputNumber
          value={values.bottom}
          withoutTicker={true}
          onChange={value => onChange('bottom', value)}
          onFocus={() => focusSide('bottom')}
          onBlur={() => focusSide(undefined)}
        />
        <InputNumber
          value={values.left}
          withoutTicker={true}
          onChange={value => onChange('left', value)}
          onFocus={() => focusSide('left')}
          onBlur={() => focusSide(undefined)}
        />
      </InputGroup>
    </ControlRowWide>
  </ControlRow>
)

export default BuilderLayoutPaddings
