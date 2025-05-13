import { ComponentRef, FC, useEffect, useRef } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface ContentEditableProps {
  Tag?: 'div' | 'span'
  value: string
  className?: string
  onChange?: (value: string) => void
  onSubmit?: (value: string) => void
}

export const ContentEditable: FC<ContentEditableProps> = ({ Tag = 'div', className, value, onChange, onSubmit }) => {
  const ref = useRef<ComponentRef<'div'>>(null)

  useEffect(() => {
    const abortController = new AbortController()

    if (ref.current) {
      ref.current.addEventListener(
        'input',
        () => {
          if (onChange && ref.current?.textContent) {
            onChange(ref.current.textContent)
          }
        },
        { signal: abortController.signal }
      )

      ref.current.addEventListener(
        'blur',
        () => {
          if (onSubmit) {
            onSubmit(ref.current?.textContent ?? '')
          }
        },
        { signal: abortController.signal }
      )

      ref.current.addEventListener(
        'keydown',
        e => {
          if (e.key === 'Enter') {
            e.preventDefault()
            ref.current?.blur()
          }
        },
        { signal: abortController.signal }
      )
    }

    return () => {
      abortController.abort()
    }
  }, [onChange, onSubmit])

  return (
    <Tag ref={ref} className={cn(styles.root, className)} contentEditable>
      {value}
    </Tag>
  )
}
