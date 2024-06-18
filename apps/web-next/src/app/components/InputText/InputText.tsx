'use client'
import { FC, InputHTMLAttributes } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  classNameInput?: string
  size?: 'medium' | 'large'
  mode?: 'primary' | 'secondary'
  value: string | number
  placeholder?: string
  onChange: (value: string | number) => void
}

const InputText: FC<InputTextProps> = ({
  className,
  classNameInput,
  size = 'medium',
  mode = 'primary',
  placeholder,
  value,
  onChange,
  ...inputProps
}) => {
  return (
    <div className={cn(styles.root, className, styles[size], styles[mode])}>
      <input
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
