import { ElementRef, FC, useEffect, useRef } from 'react'
import { animated } from '@react-spring/web'
import { CornerSide } from '@/shared/ui/CornerSides'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputGroup } from '@/shared/ui/InputGroup'
import { InputNumber } from '@/shared/ui/InputNumber'

interface BuilderStylesCornersProps {
  values: {
    top: number
    right: number
    bottom: number
    left: number
  }
  className?: string
  focusCorner(corner?: CornerSide): void
  onChange(side: CornerSide, value: number): void
}

const BuilderStylesCorners: FC<BuilderStylesCornersProps> = ({ className, values, focusCorner, onChange }) => {
  const tlRef = useRef<ElementRef<'input'>>()

  useEffect(() => {
    tlRef.current?.focus()
  }, [])

  return (
    <ControlRow>
      <ControlRowWide>
        <InputGroup>
          <InputNumber
            inputRef={tlRef}
            value={values.top}
            withoutTicker={true}
            onFocus={() => focusCorner('top')}
            onBlur={() => focusCorner(undefined)}
            onChange={value => onChange('top', value)}
          />
          <InputNumber
            value={values.right}
            withoutTicker={true}
            onFocus={() => focusCorner('right')}
            onBlur={() => focusCorner(undefined)}
            onChange={value => onChange('right', value)}
          />
          <InputNumber
            value={values.bottom}
            withoutTicker={true}
            onFocus={() => focusCorner('bottom')}
            onBlur={() => focusCorner(undefined)}
            onChange={value => onChange('bottom', value)}
          />
          <InputNumber
            value={values.left}
            withoutTicker={true}
            onFocus={() => focusCorner('left')}
            onBlur={() => focusCorner(undefined)}
            onChange={value => onChange('left', value)}
          />
        </InputGroup>
      </ControlRowWide>
    </ControlRow>
  )
}

export default animated(BuilderStylesCorners)
