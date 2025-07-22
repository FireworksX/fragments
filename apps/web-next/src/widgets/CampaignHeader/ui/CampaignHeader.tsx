import { FC, ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Avatar } from '@/shared/ui/Avatar'
import { CampaignDetailName } from '@/views/AreasDetailLayout/components/CampaignDetailName'
import { ContentEditable } from '@/shared/ui/ContentEditable'
import { Button } from '@/shared/ui/Button'
import PreviewIcon from '@/shared/icons/next/external-link.svg'
import { ToggleActiveButton } from '@/features/ToggleActiveButton'
import DeleteIcon from '@/shared/icons/next/trash.svg'
import { Container } from '@/shared/ui/Container'
import { useCampaignHeader } from '../hooks/useCampaignHeader'
import { CampaignStatus } from '@/__generated__/types'

interface CampaignHeaderProps {
  campaignID: number
  header?: ReactNode
  footer?: ReactNode
  meta?: ReactNode
  previewLink?: string
  className?: string
  DeleteButton?: ReactNode
}

export const CampaignHeader: FC<CampaignHeaderProps> = ({
  className,
  campaignID,
  DeleteButton,
  previewLink,
  header,
  footer,
  meta
}) => {
  const { campaign, rename, toggleActive } = useCampaignHeader(campaignID)

  return (
    <Container className={styles.head}>
      {header}
      <div className={styles.header}>
        <Avatar className={styles.logo} withRadius src={campaign?.logo?.url} size={64} />
        <div className={styles.info}>
          <div className={styles.name}>
            <CampaignDetailName
              name={campaign?.name}
              isActive={campaign?.status === CampaignStatus.Active}
              onRename={rename}
            />
          </div>
          {meta && <div className={styles.meta}>{meta}</div>}
        </div>

        <div className={styles.headerAside}>
          {previewLink && (
            <Button
              mode='outline'
              preventDefault
              // loading={loadingUpdateStream}
              icon={<PreviewIcon />}
              // onClick={toggleActive}
            >
              Preview
            </Button>
          )}

          <ToggleActiveButton
            isActive={campaign?.status === CampaignStatus.Active}
            // loading={loadingChangeCampaignActive}
            onClick={toggleActive}
          />

          {DeleteButton}
        </div>
      </div>

      {footer}
    </Container>
  )
}
