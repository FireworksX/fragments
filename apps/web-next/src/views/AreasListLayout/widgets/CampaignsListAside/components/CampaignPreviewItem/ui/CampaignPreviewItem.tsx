import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { isValue } from '@fragmentsx/utils'
import { StatusDot } from '@/shared/ui/StatusDot'
import CheckIcon from '@/shared/icons/next/check.svg'
import { Link } from '@/shared/ui/Link'
import { Avatar } from '@/shared/ui/Avatar'

interface CampaignPreviewItemProps {
  name: string
  logo?: string
  isActive?: boolean
  slug: string
  stats?: { label: string; value: string }[]
  className?: string
}

export const CampaignPreviewItem: FC<CampaignPreviewItemProps> = ({ className, logo, name, slug, isActive, stats }) => {
  return (
    <Link className={cn(className)} partial type='area' areaSlug={slug}>
      {({ isActive: linkIsActive }) => (
        <div className={cn(styles.root, { [styles.active]: linkIsActive })}>
          <div className={styles.header}>
            {isValue(isActive) && (
              <div className={styles.status}>
                <StatusDot status={isActive ? 'success' : 'warning'} />
              </div>
            )}
            <Avatar className={styles.logo} withRadius size={24} src={logo} />
            <div className={styles.name}>{name}</div>
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
        </div>
      )}
    </Link>
  )
}
