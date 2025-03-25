import cn from 'classnames'
import MoreHorizontal from '@/shared/icons/more-horizontal.svg'
import styles from './styles.module.css'
import { FC } from 'react'
import { Touchable } from '@/shared/ui/Touchable'
import { Button } from '@/shared/ui/Button'

interface FragmentsTreeItemProps {
  name: string
  forkedFrom?: string
  author: {
    firstName: string
    email: string
  }
  className?: string
}

export const FragmentsTreeItem: FC<FragmentsTreeItemProps> = ({ className, name, forkedFrom, author }) => {
  return (
    <Touchable className={cn(styles.root, className)} data-testid='FragmentCard'>
      <div className={styles.body}>
        <div className={styles.bodySection}>
          <div className={styles.name}>{name}</div>
          {forkedFrom && <div className={styles.description}>Forked from: {forkedFrom}</div>}
        </div>
        <div className={styles.bodySection}>
          <div className={styles.updatesAuthor}>Arthur abeltinsh</div>
          <div className={styles.updatesDate}>2 days ago</div>
        </div>
      </div>
      <div className={styles.actions}>
        <Button mode='tertiary-secondary'>
          <MoreHorizontal width={20} height={20} />
        </Button>
      </div>
    </Touchable>
  )
}
