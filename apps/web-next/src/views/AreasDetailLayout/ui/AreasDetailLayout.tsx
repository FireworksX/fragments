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
import IntegrationIcon from '@/shared/icons/next/brackets.svg'
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

interface CampaignDetailPageProps {}

export const AreasDetailLayout: FC<CampaignDetailPageProps> = ({ children }) => {
  const {
    isStreamRoute,
    editDescription,
    area,
    areaSlug,
    projectSlug,
    loadingChangeCampaignActive,
    toggleActive,
    rename,
    editCode
  } = useAreaDetail()

  return (
    <div className={styles.root}>
      {!isStreamRoute && (
        <Container className={styles.head}>
          <div className={styles.header}>
            <Avatar className={styles.logo} src={area?.defaultCampaign?.logo?.url} size={64} />
            <div className={styles.info}>
              <div className={styles.name}>
                <CampaignDetailName name={area?.name} isActive={area?.defaultCampaign?.active} onRename={rename} />
              </div>
              <div className={styles.meta}>
                <div className={styles.metaItem}>
                  ID: <ContentEditable className={styles.editable} value={area?.code} onSubmit={editCode} />
                </div>
                {/*<span>Start: 12.10.2025</span>*/}
                {/*<span>End: 25.10.2025</span>*/}
              </div>
            </div>

            <div className={styles.headerAside}>
              <Button
                mode='outline'
                preventDefault
                // loading={loadingUpdateStream}
                icon={<PreviewIcon />}
                // onClick={toggleActive}
              >
                Preview
              </Button>

              <ToggleActiveButton
                isActive={area?.defaultCampaign?.active}
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
        </Container>
      )}

      {children}
    </div>
  )
}
