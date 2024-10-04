import { ElementRef, FC, useEffect, useRef } from 'react'
import { animated } from '@react-spring/web'
import { CornerSide } from '@/shared/ui/CornerSides'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputGroup } from '@/shared/ui/InputGroup'
import { InputNumber } from '@/shared/ui/InputNumber'

interface BuilderStylesCornersProps {
  values: {
    tl: number
    tr: number
    br: number
    bl: number
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
            value={values.tl}
            withoutTicker={true}
            onFocus={() => focusCorner('tl')}
            onBlur={() => focusCorner(undefined)}
            onChange={value => onChange('tl', value)}
          />
          <InputNumber
            value={values.tr}
            withoutTicker={true}
            onFocus={() => focusCorner('tr')}
            onBlur={() => focusCorner(undefined)}
            onChange={value => onChange('tr', value)}
          />
          <InputNumber
            value={values.br}
            withoutTicker={true}
            onFocus={() => focusCorner('br')}
            onBlur={() => focusCorner(undefined)}
            onChange={value => onChange('br', value)}
          />
          <InputNumber
            value={values.bl}
            withoutTicker={true}
            onFocus={() => focusCorner('bl')}
            onBlur={() => focusCorner(undefined)}
            onChange={value => onChange('bl', value)}
          />
        </InputGroup>
      </ControlRowWide>
    </ControlRow>
  )
}

export default animated(BuilderStylesCorners)
