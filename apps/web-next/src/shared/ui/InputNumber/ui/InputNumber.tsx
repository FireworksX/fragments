'use client'
import { ElementRef, FC, InputHTMLAttributes, useRef, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import CaretUp from '@/shared/icons/caret-up.svg'
import CaretDown from '@/shared/icons/caret-down.svg'
import { SpringValue, animated } from '@react-spring/web'
import { mergeRefs } from 'react-merge-refs'
import { getFixedRationByStep } from '@/shared/utils/getFixedRationByStep'
import { Touchable } from '@/shared/ui/Touchable'

interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  value: number | string
  min?: number
  max?: number
  step?: number
  className?: string
  withoutTicker?: boolean
  disabled?: boolean
  suffix?: string
  empty?: boolean
  inputRef?: ElementRef<'input'>
  onChange: (value: number | string) => void
}

const InputNumber: FC<InputNumberProps> = animated(
  ({
    className,
    inputRef,
    empty,
    value,
    suffix,
    withoutTicker = false,
    disabled,
    min = 0,
    max,
    step = 1,
    onChange,
    ...rest
  }) => {
    const ref = useRef<ElementRef<'input'>>()
    const fixedValue = +value?.toFixed(getFixedRationByStep(step)) ?? value

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
      const nextValue = +(+fixedValue + step)

      if (typeof max !== 'undefined') {
        onChange(nextValue > max ? fixedValue : nextValue)
      } else {
        onChange(nextValue)
      }
    }

    const dec = () => {
      const nextValue = +(+fixedValue - step)
      onChange(nextValue < min ? fixedValue : nextValue)
    }

    return (
      <>
        <div className={cn(styles.root, className)}>
          <input
            className={styles.inner}
            ref={mergeRefs([refCreator, inputRef])}
            type='number'
            value={!empty ? fixedValue : ''}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            onChange={({ target }) => onChange(+target.value)}
            {...rest}
          />
          {suffix && <div className={styles.suffix}>{suffix}</div>}
          {!withoutTicker && !disabled && (
            <div className={styles.tickers}>
              <Touchable TagName='button' className={styles.ticker} onClick={inc}>
                <CaretUp width={8} height={11} />
              </Touchable>
              <Touchable TagName='button' className={styles.ticker} onClick={dec}>
                <CaretDown width={8} height={11} />
              </Touchable>
            </div>
          )}
        </div>
      </>
    )
  }
)

export default InputNumber
