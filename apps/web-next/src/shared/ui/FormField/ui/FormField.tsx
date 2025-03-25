import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface FormFieldProps extends PropsWithChildren {
  label?: string
  className?: string
}

export const FormField: FC<FormFieldProps> = ({ className, children, label }) => (
  <div className={cn(styles.root, className)} data-testid='FormField'>
    {label && <div className={styles.label}>{label}</div>}
    {children}
  </div>
)
