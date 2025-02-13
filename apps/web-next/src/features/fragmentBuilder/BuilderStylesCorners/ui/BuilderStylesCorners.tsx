import { ComponentRef, ElementRef, FC, useEffect, useRef } from 'react'
import { animated } from '@react-spring/web'
import { CornerSide } from '@/shared/ui/CornerSides'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputGroup } from '@/shared/ui/InputGroup'
import { InputNumber } from '@/shared/ui/InputNumber'

interface BuilderStylesCornersProps {
  values: [number, number, number, number]
  className?: string
  focusCorner(sideIndex?: number): void
  onChange(sideIndex: number, value: number): void
}

const BuilderStylesCorners: FC<BuilderStylesCornersProps> = ({ className, values, focusCorner, onChange }) => {
  const tlRef = useRef<ComponentRef<'input'>>()

  useEffect(() => {
    tlRef.current?.focus()
  }, [])

  return (
    <ControlRow>
      <ControlRowWide>
        <InputGroup>
          {values.map((value, index) => (
            <InputNumber
              key={index}
              inputRef={tlRef}
              value={value}
              withoutTicker={true}
              onFocus={() => focusCorner(index)}
              onBlur={() => focusCorner(undefined)}
              onChange={value => onChange(index, value)}
            />
          ))}
        </InputGroup>
      </ControlRowWide>
    </ControlRow>
  )
}

export default BuilderStylesCorners
