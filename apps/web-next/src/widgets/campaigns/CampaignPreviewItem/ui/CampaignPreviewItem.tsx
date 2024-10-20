import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Container } from '@/shared/ui/Container'
import { Touchable } from '@/shared/ui/Touchable'

interface CampaignPreviewItemProps {
  className?: string
}

export const CampaignPreviewItem: FC<CampaignPreviewItemProps> = ({ className }) => {
  return (
    <Touchable className={cn(className)}>
      <Container className={styles.root}>
        <div className={styles.header}>
          <div className={styles.logo}></div>
          <div className={styles.name}>Gift</div>
          <div className={styles.status}>Active</div>
        </div>

        <div className={styles.stats}>
          <div>
            <div className={styles.statsTitle}>ggd</div>
            <div>12.222</div>
          </div>
          <div>
            <div className={styles.statsTitle}>ggd</div>
            <div>12.222</div>
          </div>
          <div>
            <div className={styles.statsTitle}>ggd</div>
            <div>12.222</div>
          </div>
        </div>
      </Container>
    </Touchable>
  )
}
