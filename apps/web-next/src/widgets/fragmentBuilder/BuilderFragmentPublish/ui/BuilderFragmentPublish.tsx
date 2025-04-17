import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Cell } from '@/shared/ui/Cell'
import GlobeIcon from '@/shared/icons/next/globe.svg'
import ClockIcon from '@/shared/icons/next/clock.svg'
import ChangesIcon from '@/shared/icons/next/users.svg'
import { Button } from '@/shared/ui/Button'

interface BuilderFragmentPublishProps {
  className?: string
}

export const BuilderFragmentPublish: FC<BuilderFragmentPublishProps> = ({ className }) => {
  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.options}>
        <Cell className={styles.option} before={<GlobeIcon />}>
          gwegxs.fragments.io
        </Cell>
        <Cell disabled className={styles.option} before={<ClockIcon />}>
          2 days ago by Arthur
        </Cell>
        <Cell disabled className={styles.option} before={<ChangesIcon />}>
          View Changes
        </Cell>
      </div>
      <Button>Release</Button>
    </div>
  )
}
