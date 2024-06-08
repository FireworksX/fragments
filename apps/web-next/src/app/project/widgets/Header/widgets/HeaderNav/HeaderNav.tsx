import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Button from '@/app/components/Button'
import Avatar from '@/app/components/Avatar/Avatar'
import Dropdown from '@/app/components/Dropdown/Dropdown'
import { FeedbackForm } from '@/app/project/widgets/FeedbackForm/FeedbackForm'

interface HeaderNavProps {
  className?: string
}

export const HeaderNav: FC<HeaderNavProps> = ({ className }) => (
  <div className={cn(styles.root, className)} data-testid='HeaderNav'>
    <div className={styles.nav}>
      <Dropdown trigger='click' options={<FeedbackForm />}>
        <Button className={styles.button} size='regular' mode='outline'>
          Feedback
        </Button>
      </Dropdown>

      <Button className={styles.button} size='regular' mode='tertiary-secondary'>
        Changelog
      </Button>
      <Button className={styles.button} size='regular' mode='tertiary-secondary'>
        Help
      </Button>
      <Button className={styles.button} size='regular' mode='tertiary-secondary'>
        Docs
      </Button>
    </div>

    <Avatar size={34} uniqueId={'test'} />
  </div>
)
