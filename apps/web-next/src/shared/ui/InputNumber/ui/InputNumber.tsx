'use client'
import { ComponentRef, ElementRef, FC, InputHTMLAttributes, useMemo, useRef, useState } from 'react'
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
  inputRef?: ComponentRef<'input'>
  // Если будет 0, то не показываем
  zeroIsEmpty?: boolean
  onChange: (value: number | string) => void
}

const InputNumber: FC<InputNumberProps> = animated(
  ({
    className,
    inputRef,
    empty,
    zeroIsEmpty = false,
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
    const ref = useRef<ComponentRef<'input'>>(null)
    const fixedValue = useMemo(() => {
      let resultValue = typeof value === 'number' ? +value?.toFixed(getFixedRationByStep(step)) ?? value : value

      if (zeroIsEmpty && typeof resultValue === 'number' && resultValue === 0) {
        resultValue = ''
      }

      return resultValue
    }, [zeroIsEmpty, step, value])
    // const resultValue =

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

    const proxyOnChange = (value: unknown) => {
      if (typeof value === 'string' && value.startsWith('0') && value.length > 1) {
        value = value.replace(/^0+/, '')
      }

      onChange?.(+value)
    }

    const inc = () => {
      const nextValue = +(+fixedValue + step)

      if (typeof max !== 'undefined') {
        proxyOnChange(nextValue > max ? fixedValue : nextValue)
      } else {
        proxyOnChange(nextValue)
      }
    }

    const dec = () => {
      const nextValue = +(+fixedValue - step)
      proxyOnChange(nextValue < min ? fixedValue : nextValue)
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
            onChange={e => onChange(+e.target.value)}
            onInput={e => {
              // Убираем ведущий ноль в реальном времени
              if (e.target.value.startsWith('0') && e.target.value.length > 1) {
                e.target.value = e.target.value.replace(/^0+/, '')
              }
            }}
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
