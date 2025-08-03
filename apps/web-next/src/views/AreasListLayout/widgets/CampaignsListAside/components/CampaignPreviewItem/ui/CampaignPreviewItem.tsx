import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { isValue } from '@fragmentsx/utils'
import { StatusDot } from '@/shared/ui/StatusDot'
import CheckIcon from '@/shared/icons/next/check.svg'
import { Link } from '@/shared/ui/Link'
import { Avatar } from '@/shared/ui/Avatar'
import ArrowUp from '@/shared/icons/next/arrow-up.svg'
import { Chip } from '@/shared/ui/Chip'

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

          <Chip mode={linkIsActive ? 'success' : 'danger'} prefix={<ArrowUp width={10} height={10} />} size='sm'>
            1.4%
          </Chip>
        </div>
      )}
    </Link>
  )
}
