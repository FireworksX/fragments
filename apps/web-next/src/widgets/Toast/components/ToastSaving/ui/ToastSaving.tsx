import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Spinner } from '@/shared/ui/Spinner'
import { useToast } from '@/widgets/Toast/hooks/useToast'
import CheckIcon from '@/shared/icons/next/check.svg'

interface ToastSavingProps {
  className?: string
}

export const ToastSaving: FC<ToastSavingProps> = ({ className }) => {
  const { context } = useToast()
  const isSuccess = context?.status === 'success'

  return (
    <div className={cn(styles.root, className, { [styles.success]: isSuccess })}>
      {isSuccess ? <CheckIcon /> : <Spinner size={14} color='var(--text-color)' />}

      <div>{isSuccess ? 'Saved' : 'Saving...'}</div>
    </div>
  )
}
