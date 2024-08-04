'use client'
import { ElementRef, FC, InputHTMLAttributes, MutableRefObject } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  classNameInput?: string
  size?: 'medium' | 'large'
  mode?: 'primary' | 'secondary'
  value: string | number
  placeholder?: string
  inputRef?: MutableRefObject<ElementRef<'input'>>
  onChange: (value: string | number) => void
}

const InputText: FC<InputTextProps> = ({
  className,
  classNameInput,
  size = 'medium',
  mode = 'primary',
  placeholder,
  value,
  inputRef,
  onChange,
  ...inputProps
}) => {
  return (
    <div className={cn(styles.root, className, styles[size], styles[mode])}>
      <input
        ref={inputRef}
        className={cn(styles.input, classNameInput)}
        value={value}
        placeholder={placeholder}
        onChange={({ target }) => onChange?.(target.value)}
        {...inputProps}
      />
    </div>
  )
}

export default InputText
