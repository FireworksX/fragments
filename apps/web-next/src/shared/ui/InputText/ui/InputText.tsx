'use client'
import {
  ComponentRef,
  ElementRef,
  FC,
  forwardRef,
  InputHTMLAttributes,
  MutableRefObject,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { animated } from '@react-spring/web'
import { mergeRefs } from 'react-merge-refs'

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  classNameInput?: string
  size?: 'medium' | 'large'
  mode?: 'primary' | 'secondary'
  value: string | number
  placeholder?: string
  /**
   * При true, input будет накапливать значение при фокусе,
   * когда фокус снимется, вызовется один onChange
   */
  focusControlled?: boolean
  inputRef?: RefObject<ComponentRef<'input'>>
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
  focusControlled = false,
  inputRef,
  onChange,
  onChangeValue,
  onSubmit,
  ...inputProps
}) => {
  const [localValue, setLocalValue] = useState(value)
  const resultValue = focusControlled ? localValue : value

  useEffect(() => {
    if (focusControlled) {
      setLocalValue(value)
    }
  }, [value, focusControlled])

  const handleOnChange = useCallback(
    e => {
      const value = e?.target?.value
      if (focusControlled) {
        setLocalValue(value)
      } else {
        onChange?.(e)
        onChangeValue?.(value)
      }
    },
    [focusControlled, onChange, onChangeValue]
  )

  const handleOnBlur = useCallback(() => {
    if (focusControlled) {
      onChangeValue?.(localValue)
    }
  }, [focusControlled, onChangeValue, localValue])

  return (
    <div className={cn(styles.root, className, styles[size], styles[mode])}>
      <input
        ref={inputRef}
        className={cn(styles.input, classNameInput)}
        value={resultValue}
        placeholder={placeholder}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        onKeyDown={event => {
          if (event.key === 'Enter') {
            onSubmit?.()
            event?.target?.blur?.()
          }
        }}
        {...inputProps}
      />
    </div>
  )
}
