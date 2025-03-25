import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Container } from '@/shared/ui/Container'
import { Touchable } from '@/shared/ui/Touchable'
import { isValue } from '@fragments/utils'
import { Link } from '@/shared/ui/Link'
import CheckIcon from '@/shared/icons/next/check.svg'

interface CampaignPreviewItemProps {
  name: string
  logo?: string
  isActive?: boolean
  slug: string
  stats?: { label: string; value: string }[]
  className?: string
}

export const CampaignPreviewItem: FC<CampaignPreviewItemProps> = ({ className, name, slug, isActive, stats, logo }) => {
  return (
    <Link className={cn(className)} partial type='campaign' campaignSlug={slug}>
      {({ isActive: linkIsActive }) => (
        <Container className={cn(styles.root, { [styles.active]: linkIsActive })}>
          <div className={styles.header}>
            {isValue(isActive) && (
              <div className={cn(styles.status, isActive ? styles.status_active : styles.status_stop)} />
            )}
            <div className={styles.logo}></div>
            <div className={styles.name}>{name}</div>

            {linkIsActive && (
              <div className={styles.checkIcon}>
                <CheckIcon />
              </div>
            )}
          </div>

          {stats && (
            <div className={styles.stats}>
              {stats.map(stat => (
                <div key={stat.label}>
                  <div className={styles.statsTitle}>{stat.label}</div>
                  <div>{stat.value}</div>
                </div>
              ))}
            </div>
          )}
        </Container>
      )}
    </Link>
  )
}
