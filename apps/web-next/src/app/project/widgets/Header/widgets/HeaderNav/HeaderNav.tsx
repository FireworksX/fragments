'use client'
import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Button from '@/app/components/Button'
import Avatar from '@/app/components/Avatar/Avatar'
import Dropdown from '@/app/components/Dropdown/Dropdown'
import { FeedbackForm } from '@/app/project/widgets/FeedbackForm/FeedbackForm'
import { CurrentProfileDropdown } from '@/app/project/widgets/Header/widgets/HeaderNav/components/CurrentProfileDropdown/CurrentProfileDropdown'
import { useRequest } from '@/app/hooks/requests/useRequest'
import { requestConfig, requestType } from '@/app/hooks/requests/requestConfig'
import Touchable from '@/app/components/Touchable'

interface HeaderNavProps {
  className?: string
}

export const HeaderNav: FC<HeaderNavProps> = ({ className }) => {
  const { data: currentUser } = useRequest(requestType.profile)

  return (
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

      {currentUser && (
        <Dropdown trigger='click' options={<CurrentProfileDropdown />}>
          <Touchable TagName='button'>
            <Avatar
              size={34}
              uniqueId={currentUser.email}
              firstName={currentUser.first_name}
              lastName={currentUser.last_name}
            />
          </Touchable>
        </Dropdown>
      )}
    </div>
  )
}
