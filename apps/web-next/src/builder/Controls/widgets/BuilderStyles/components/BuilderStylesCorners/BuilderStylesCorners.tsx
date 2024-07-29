import { ElementRef, FC, useEffect, useRef } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import ControlRowWide from '@/builder/components/ControlRow/components/ControlRowWide/ControlRowWide'
import InputGroup from '@/app/components/InputGroup/InputGroup'
import InputNumber from '@/app/components/InputNumber/InputNumber'
import ControlRow from '@/builder/components/ControlRow/ControlRow'
import { CornerSide } from '@/app/components/CornerSides/CornerSides'
import { animated } from '@react-spring/web'

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
