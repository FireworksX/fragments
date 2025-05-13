import { FC, ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Dropdown } from '@/shared/ui/Dropdown'
import { Button } from '@/shared/ui/Button'

interface HeaderNavProps {
  className?: string
  currentUserNode?: ReactNode
  feedbackFormNode?: ReactNode
}

export const HeaderNav: FC<HeaderNavProps> = ({ className, currentUserNode, feedbackFormNode }) => {
  return (
    <div className={cn(styles.root, className)} data-testid='HeaderNav'>
      <div className={styles.nav}>
        <Dropdown trigger='click' options={feedbackFormNode}>
          <Button className={styles.button} size='medium' mode='outline'>
            Feedback
          </Button>
        </Dropdown>

        <Button className={styles.button} mode='tertiary-secondary'>
          Changelog
        </Button>
        <Button className={styles.button} mode='tertiary-secondary'>
          Help
        </Button>
        <Button className={styles.button} mode='tertiary-secondary'>
          Docs
        </Button>
      </div>

      {currentUserNode}
    </div>
  )
}
