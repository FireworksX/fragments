'use client'
import { FC } from 'react'
import styles from './styles.module.css'
import { Container } from '@/shared/ui/Container'
import { Button } from '@/shared/ui/Button'
import EditIcon from '@/shared/icons/next/settings.svg'
import PauseIcon from '@/shared/icons/next/pause.svg'
import RunIcon from '@/shared/icons/next/play.svg'
import DeleteIcon from '@/shared/icons/next/trash.svg'
import { useCampaignDetail } from '@/views/CampaignDetailLayout/hooks/useCampaignDetail'
import Tabs from '../../../shared/ui/Tabs/ui'
import { TabItem } from '@/shared/ui/TabItem'
import { Link } from '@/shared/ui/Link'
import { ToggleActiveButton } from '@/features/ToggleActiveButton/ui/ToggleActiveButton'
import isBrowser from '@/shared/utils/isBrowser'

interface CampaignDetailPageProps {}

export const CampaignDetailLayout: FC<CampaignDetailPageProps> = ({ children }) => {
  const { isStreamRoute, campaign, campaignSlug, projectSlug, loadingChangeCampaignActive, toggleActive } =
    useCampaignDetail()

  return (
    <Container className={styles.root}>
      {!isStreamRoute && (
        <>
          <div className={styles.header}>
            <div className={styles.logo}></div>
            <div>
              <div className={styles.name}>
                {campaign?.name}
                {campaign?.active && <span className={styles.liveBadge}>live</span>}
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

          <div className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet corporis deserunt doloremque sunt voluptatum.
            Asperiores cum, debitis dolor eaque eos ex facere in inventore maiores minima modi, odit, perspiciatis
            tenetur.
          </div>

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
