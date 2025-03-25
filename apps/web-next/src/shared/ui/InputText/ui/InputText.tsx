'use client'
import { ElementRef, FC, forwardRef, InputHTMLAttributes, MutableRefObject } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { animated } from '@react-spring/web'

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  classNameInput?: string
  size?: 'medium' | 'large'
  mode?: 'primary' | 'secondary'
  value: string | number
  placeholder?: string
  inputRef?: MutableRefObject<ElementRef<'input'>>
  onChange?: (value: string | number) => void
  onChangeValue?: (value: string | number) => void
  onSubmit?: () => void
}

export const InputText: FC<InputTextProps> = ({
  className,
  classNameInput,
  size = 'medium',
  mode = 'primary',
  placeholder,
  value,
  inputRef,
  onChange,
  onChangeValue,
  onSubmit,
  ...inputProps
}) => {
  return (
    <div className={cn(styles.root, className, styles[size], styles[mode])}>
      <input
        ref={inputRef}
        className={cn(styles.input, classNameInput)}
        value={value}
        placeholder={placeholder}
        onChange={e => {
          onChange?.(e)
          onChangeValue?.(e?.target.value)
        }}
        onKeyDown={event => {
          if (event.key === 'Enter' && onSubmit) {
            onSubmit()
          }
        }}
        {...inputProps}
      />
    </div>
  )
}
