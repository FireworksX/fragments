import { FC, InputHTMLAttributes } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  value: string | number
  placeholder?: string
  onChange: (value: string | number) => void
}

const InputText: FC<InputTextProps> = ({ className, placeholder, value, onChange, ...inputProps }) => {
  return (
    <div className={cn(styles.root, className)}>
      <input
        className={styles.inner}
        value={value}
        placeholder={placeholder}
        onChange={({ target }) => onChange(target.value)}
        {...inputProps}
      />
    </div>
  )
}

export default InputText
