'use client'
import { FC } from 'react'
import styles from './styles.module.css'
import { Container } from '@/shared/ui/Container'
import { Button } from '@/shared/ui/Button'
import EditIcon from '@/shared/icons/next/pencil.svg'
import CloseIcon from '@/shared/icons/next/close.svg'
import CheckIcon from '@/shared/icons/next/check.svg'
import PauseIcon from '@/shared/icons/next/pause.svg'
import RunIcon from '@/shared/icons/next/play.svg'
import DeleteIcon from '@/shared/icons/next/trash.svg'
import { useCampaignDetail } from '@/views/CampaignDetailLayout/hooks/useCampaignDetail'
import Tabs from '../../../shared/ui/Tabs/ui'
import { TabItem } from '@/shared/ui/TabItem'
import { Link } from '@/shared/ui/Link'
import { ToggleActiveButton } from '@/features/ToggleActiveButton/ui/ToggleActiveButton'
import isBrowser from '@/shared/utils/isBrowser'
import { InputText } from '@/shared/ui/InputText'
import { Textarea } from '@/shared/ui/Textarea'
import { CampaignDetailName } from '@/views/CampaignDetailLayout/components/CampaignDetailName'
import { CampaignDetailDescription } from '@/views/CampaignDetailLayout/components/CampaignDetailDescription'

interface CampaignDetailPageProps {}

export const CampaignDetailLayout: FC<CampaignDetailPageProps> = ({ children }) => {
  const {
    isStreamRoute,
    editDescription,
    campaign,
    campaignSlug,
    projectSlug,
    loadingChangeCampaignActive,
    toggleActive,
    rename
  } = useCampaignDetail()

  return (
    <Container className={styles.root}>
      {!isStreamRoute && (
        <>
          <div className={styles.header}>
            <div className={styles.logo}></div>
            <div className={styles.info}>
              <div className={styles.name}>
                <CampaignDetailName name={campaign?.name} isActive={campaign?.active} onRename={rename} />
              </div>
              <div className={styles.meta}>
                <span>Start: 12.10.2025</span>
                <span>End: 25.10.2025</span>
              </div>
            </div>

            <div className={styles.headerAside}>
              <ToggleActiveButton
                isActive={campaign?.active}
                loading={loadingChangeCampaignActive}
                onClick={toggleActive}
              />

              <Button
                mode='danger-outline'
                preventDefault
                // loading={loadingUpdateStream}
                icon={<DeleteIcon />}
                // onClick={toggleActive}
              >
                Delete
              </Button>
            </div>
          </div>

          <CampaignDetailDescription value={campaign?.description} onSubmit={editDescription} />

          <Tabs>
            <Link type='campaign' campaignSlug={campaignSlug} projectSlug={projectSlug}>
              {({ isActive }) => (
                <TabItem name='overview' isActive={isActive}>
                  Overview
                </TabItem>
              )}
            </Link>
            <Link type='campaignStreams' campaignSlug={campaignSlug} projectSlug={projectSlug}>
              {({ isActive }) => (
                <TabItem name='overview' isActive={isActive}>
                  Streams
                </TabItem>
              )}
            </Link>
          </Tabs>
        </>
      )}

      {children}
    </Container>
  )
}
