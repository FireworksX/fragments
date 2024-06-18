import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Avatar from '@/app/components/Avatar/Avatar'
import Button from '@/app/components/Button'
import MoreHorizontal from '@/app/svg/more-horizontal.svg'
import Touchable from '@/app/components/Touchable'

interface FragmentCardProps {
  name: string
  forkedFrom?: string
  author: {
    first_name: string
    email: string
  }
  className?: string
}

export const FragmentCard: FC<FragmentCardProps> = ({ className, name, forkedFrom, author }) => (
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
