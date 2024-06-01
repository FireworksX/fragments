'use client'
import { ElementRef, FC, InputHTMLAttributes, useRef } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Touchable from '@/app/components/Touchable'
import CaretUp from '@/app/svg/caret-up.svg'
import CaretDown from '@/app/svg/caret-down.svg'

interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  value: number | string
  min?: number
  max?: number
  step?: number
  className?: string
  withoutTicker?: boolean
  disabled?: boolean
  suffix?: string
  onChange: (value: number | string) => void
}

const InputNumber: FC<InputNumberProps> = ({
  className,
  value,
  suffix,
  withoutTicker = false,
  disabled,
  min = 0,
  max,
  step = 1,
  onChange
}) => {
  const ref = useRef<ElementRef<'input'>>()

  const refCreator = (target?: ElementRef<'input'> | null) => {
    const listener = () => {
      target?.blur()
    }

    if (target) {
      target.addEventListener('wheel', listener, { passive: true })
    } else {
      ref.current?.removeEventListener('wheel', listener)
    }
  }

  const inc = () => {
    const nextValue = +(+value + step).toFixed(1)

    if (typeof max !== 'undefined') {
      onChange(nextValue > max ? value : nextValue)
    } else {
      onChange(nextValue)
    }
  }

  const dec = () => {
    const nextValue = +(+value - step).toFixed(1)
    onChange(nextValue < min ? value : nextValue)
  }

  return (
    <div className={cn(styles.root, className)}>
      <input
        className={styles.inner}
        ref={refCreator}
        type='number'
        value={value}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onChange={({ target }) => onChange(target.value)}
      />
      {suffix && <div className={styles.suffix}>{suffix}</div>}
      {!withoutTicker && !disabled && (
        <div className={styles.tickers}>
          <Touchable className={styles.ticker} onClick={inc}>
            <CaretUp width={8} height={11} />
          </Touchable>
          <Touchable className={styles.ticker} onClick={dec}>
            <CaretDown width={8} height={11} />
          </Touchable>
        </div>
      )}
    </div>
  )
}

export default InputNumber
