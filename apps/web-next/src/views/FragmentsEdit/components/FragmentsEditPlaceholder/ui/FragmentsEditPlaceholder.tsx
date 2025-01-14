import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import LogoIcon from '@/shared/icons/next/logo.svg'
import { Button } from '@/shared/ui/Button'
import { Spinner } from '@/shared/ui/Spinner'
import { useDroppable } from '@dnd-kit/core'

interface FragmentsEditPlaceholderProps {
  fetching?: boolean
  className?: string
}

export const FragmentsEditPlaceholder: FC<FragmentsEditPlaceholderProps> = ({ className, fetching }) => {
  const { setNodeRef } = useDroppable({
    id: 'builder-edit-placeholder'
  })

  return (
    <div className={cn(styles.root, className)} ref={setNodeRef}>
      <LogoIcon width={40} height={40} />

      {fetching ? (
        <Spinner color='var(--text-color-accent-secondary)' />
      ) : (
        <>
          <div>
            <h1 className={styles.title}>No such file</h1>
            <p className={styles.description}>Select fragment form project or create new.</p>
          </div>
          <Button>Create Fragment</Button>
        </>
      )}
    </div>
  )
}
