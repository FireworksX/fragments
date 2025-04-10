import { FC, ReactNode, useContext, useMemo } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { ToastContext } from '@/widgets/Toast/providers/ToastContext'
import { useGraph } from '@graph-state/react'
import { useToast } from '@/widgets/Toast/hooks/useToast'
import { builderToasts } from '@/shared/data'
import { ToastInserting } from '@/widgets/Toast/components/ToastInserting'
import { ToastSaving } from '@/widgets/Toast/components/ToastSaving'

interface ToastProps {
  render: ({ isOpen, variant, Node }) => ReactNode
}

export const Toast: FC<ToastProps> = ({ render }) => {
  const { isOpen, variant } = useToast()

  const Node = useMemo(
    () =>
      ({
        [builderToasts.inserting]: <ToastInserting />,
        [builderToasts.saving]: <ToastSaving />
      }[variant]),
    [variant]
  )

  return render({ isOpen, variant, Node })
}
