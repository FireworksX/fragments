import { FC } from 'react'
import Image from 'next/image'
import cn from 'classnames'
import styles from './styles.module.css'
import { Button } from '@/shared/ui/Button'
import bgImage from '../images/current-fragment-bg.png'

interface CurrentFragmentPreviewProps {
  className?: string
}

export const CurrentFragmentPreview: FC<CurrentFragmentPreviewProps> = ({ className }) => {
  return (
    <div className={cn(styles.root, className)}>
      <Image className={styles.image} src={bgImage} alt='bg' />
      <div className={styles.inner}>
        <div className={styles.head}>Default Fragment</div>

        <div className={styles.placeholder}>
          <div className={styles.title}>Secure Area with a Backup Fragment</div>
          <div className={styles.description}>
            A fragment is useful if campaigns are inactive. Configure it in Content to be prepared.
          </div>
        </div>

        <Button className={styles.action} size='large'>
          Set Fragment
        </Button>
      </div>
    </div>
  )
}
