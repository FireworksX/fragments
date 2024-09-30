'use client'
import { FC, InputHTMLAttributes } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import cn from 'classnames'
import styles from './styles.module.css'
import { animated } from '@react-spring/web'

interface TextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  value: string
  className?: string
  onChange(value: TextareaProps['value']): void
}

const Textarea: FC<TextareaProps> = ({ className, value, onChange, ...rest }) => {
  return (
    <TextareaAutosize
      minRows={1}
      maxRows={10}
      className={cn(styles.root, className)}
      value={value}
      onChange={({ target: { value } }) => onChange(value)}
      {...rest}
    />
  )
}

export default animated(Textarea)
