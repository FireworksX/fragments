import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Avatar from '@/app/components/Avatar/Avatar'
import Button from '@/app/components/Button'
import MoreHorizontal from '@/app/svg/more-horizontal.svg'

interface FragmentCardProps {
  className?: string
}

export const FragmentCard: FC<FragmentCardProps> = ({ className }) => (
  <li className={cn(styles.root, className)} data-testid='FragmentCard'>
    <div className={styles.body}>
      <div className={styles.bodySection}>
        <div className={styles.name}>name</div>
        <div className={styles.description}>Forked from: Template</div>
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
  </li>
)
