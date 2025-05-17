import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { ContentEditable } from '@/shared/ui/ContentEditable'
import { Touchable } from '@/shared/ui/Touchable'

interface CampaignDetailDescriptionProps {
  value?: string
  className?: string
  onSubmit?: (value: string) => void
}

export const CampaignDetailDescription: FC<CampaignDetailDescriptionProps> = ({ className, value, onSubmit }) => {
  return (
    <div className={cn(styles.root, className)}>
      {value ? (
        <ContentEditable className={styles.content} value={value} onSubmit={onSubmit} />
      ) : (
        <Touchable effect='none' className={styles.empty} onClick={() => onSubmit?.('Some description')}>
          Add description...
        </Touchable>
      )}
    </div>
  )
}
