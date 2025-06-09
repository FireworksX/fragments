'use client'
import { FC } from 'react'
import styles from './styles.module.css'
import { Container } from '@/shared/ui/Container'
import { Button } from '@/shared/ui/Button'
import PreviewIcon from '@/shared/icons/next/external-link.svg'
import OverviewIcon from '@/shared/icons/next/panels-top-left.svg'
import ExperimentsIcon from '@/shared/icons/next/flask-conical.svg'
import VisualIcon from '@/shared/icons/next/component.svg'
import StreamsIcon from '@/shared/icons/next/podcast.svg'
import DeleteIcon from '@/shared/icons/next/trash.svg'
import IntegrationIcon from '@/shared/icons/next/blocks.svg'
import { useAreaDetail } from '@/views/AreasDetailLayout/hooks/useAreaDetail'
import Tabs from '../../../shared/ui/Tabs/ui'
import { TabItem } from '@/shared/ui/TabItem'
import { Link } from '@/shared/ui/Link'
import { ToggleActiveButton } from '@/features/ToggleActiveButton/ui/ToggleActiveButton'
import isBrowser from '@/shared/utils/isBrowser'
import { InputText } from '@/shared/ui/InputText'
import { Textarea } from '@/shared/ui/Textarea'
import { CampaignDetailName } from '@/views/AreasDetailLayout/components/CampaignDetailName'
import { CampaignDetailDescription } from '@/views/AreasDetailLayout/components/CampaignDetailDescription'
import { ContentEditable } from '@/shared/ui/ContentEditable'
import { TabItemBadge } from '@/shared/ui/TabItem/components/TabItemBadge'
import { Avatar } from '@/shared/ui/Avatar'
import { CampaignHeader } from '@/widgets/CampaignHeader'

interface CampaignDetailPageProps {}

export const AreasDetailLayout: FC<CampaignDetailPageProps> = ({ children }) => {
  const { areaSlug, isCampaignRoute, area, editDescription, editCode, projectSlug } = useAreaDetail()

  return (
    <div className={styles.root}>
      {!isCampaignRoute && (
        <CampaignHeader
          campaignID={area?.defaultCampaign?.id}
          meta={
            <div className={styles.id}>
              ID: <ContentEditable className={styles.editable} value={area?.code} onSubmit={editCode} />
            </div>
          }
          footer={
            <>
              <CampaignDetailDescription value={area?.description} onSubmit={editDescription} />
              <Tabs>
                <Link type='area' areaSlug={areaSlug} projectSlug={projectSlug}>
                  {({ isActive }) => (
                    <TabItem name='overview' icon={<OverviewIcon />} isActive={isActive}>
                      Overview
                    </TabItem>
                  )}
                </Link>
                <Link type='areaFragment' areaSlug={areaSlug} projectSlug={projectSlug}>
                  {({ isActive }) => (
                    <TabItem name='areaFragment' icon={<VisualIcon />} isActive={isActive}>
                      Fragment
                    </TabItem>
                  )}
                </Link>
                <Link type='areaExperiments' areaSlug={areaSlug} projectSlug={projectSlug}>
                  {({ isActive }) => (
                    <TabItem
                      name='areaExperiments'
                      badge={<TabItemBadge mode='success'>Active</TabItemBadge>}
                      icon={<ExperimentsIcon />}
                      isActive={isActive}
                    >
                      Experiments
                    </TabItem>
                  )}
                </Link>
                <Link type='areaCampaigns' areaSlug={areaSlug} projectSlug={projectSlug}>
                  {({ isActive }) => (
                    <TabItem
                      name='areaStreams'
                      badge={<TabItemBadge>8</TabItemBadge>}
                      icon={<StreamsIcon />}
                      isActive={isActive}
                    >
                      Campaings
                    </TabItem>
                  )}
                </Link>
                <Link type='areaIntegration' areaSlug={areaSlug} projectSlug={projectSlug}>
                  {({ isActive }) => (
                    <TabItem name='areaIntegration' icon={<IntegrationIcon />} isActive={isActive}>
                      Integration
                    </TabItem>
                  )}
                </Link>
              </Tabs>
            </>
          }
        />
      )}

      {children}
    </div>
  )
}
