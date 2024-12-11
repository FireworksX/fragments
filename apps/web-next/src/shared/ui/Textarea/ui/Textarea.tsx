'use client'
import { ElementRef, FC, forwardRef, InputHTMLAttributes, MutableRefObject } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import cn from 'classnames'
import styles from './styles.module.css'
import { animated } from '@react-spring/web'

interface TextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  value: string
  className?: string
  inputRef?: MutableRefObject<ElementRef<'input'>>
  onChangeValue: (value: string | number) => void
}

const BaseTextarea: FC<TextareaProps> = ({ className, inputRef, value, onChange, onChangeValue, ...rest }) => {
  return (
    <TextareaAutosize
      ref={inputRef}
      minRows={1}
      maxRows={10}
      className={cn(styles.root, className)}
      value={value}
      onChange={e => {
        onChange?.(e)
        onChangeValue?.(e.target.value)
      }}
      {...rest}
    />
  )
}

export const Textarea = forwardRef<ElementRef<'input'>, TextareaProps>((props, ref) => (
  <BaseTextarea {...props} inputRef={ref} />
))

export const TextareaAnimated = animated(BaseTextarea)
