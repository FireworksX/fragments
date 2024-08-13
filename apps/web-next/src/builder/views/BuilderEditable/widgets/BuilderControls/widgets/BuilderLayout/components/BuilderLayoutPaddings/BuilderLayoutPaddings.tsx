import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import ControlRowWide from '@/builder/components/ControlRow/components/ControlRowWide/ControlRowWide'
import InputGroup from '@/app/components/InputGroup/InputGroup'
import InputNumber from '@/app/components/InputNumber/InputNumber'
import ControlRow from '@/builder/components/ControlRow/ControlRow'
import { CornerSide } from '@/app/components/CornerSides/CornerSides'
import { BoxSide } from '@/app/components/BoxSizingSides/BoxSizingSides'

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

export const BuilderLayoutPaddings: FC<BuilderLayoutPaddingsProps> = ({ className, values, focusSide, onChange }) => (
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
