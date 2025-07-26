'use client'
import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Link } from '@/shared/ui/Link'
import { Touchable } from '@/shared/ui/Touchable'
import ArrowLeftIcon from '@/shared/icons/next/arrow-left.svg'
import { InputText } from '@/shared/ui/InputText'
import { StreamFilterLocation } from '@/views/CampaignDetailLayout/widgets/StreamFilterLocation'
import { StreamFilterDevices } from '@/views/CampaignDetailLayout/widgets/StreamFilterDevices'
import { StreamFilterOperationals } from '@/views/CampaignDetailLayout/widgets/StreamFilterOperationals'
import { Dropdown } from '@/shared/ui/Dropdown'
import { DropdownGroup } from '@/shared/ui/DropdownGroup'
import { DropdownOption } from '@/shared/ui/DropdownOption'
import { Chip } from '@/shared/ui/Chip'
import PlusIcon from '@/shared/icons/next/plus.svg'
import { ToggleActiveButton } from '@/features/ToggleActiveButton'
import { Button } from '@/shared/ui/Button'
import EditIcon from '@/shared/icons/next/pencil.svg'
import DeleteIcon from '@/shared/icons/next/trash.svg'
import DoneIcon from '@/shared/icons/next/check.svg'
import CloseIcon from '@/shared/icons/next/close.svg'
import { useCampaignHeader } from '@/views/CampaignDetailLayout/widgets/CampaignHeaderLayout/hooks/useCampaignHeader'
import { StatusBadge } from '@/shared/ui/StatusBadge'
import { ContentEditable } from '@/shared/ui/ContentEditable'
import { StreamFilterWeight } from '@/views/CampaignDetailLayout/widgets/StreamFilterWeight'
import { Container } from '@/shared/ui/Container'
import Tabs from '@/shared/ui/Tabs/ui'
import { TabItem } from '@/shared/ui/TabItem'
import OverviewIcon from '@/shared/icons/next/panels-top-left.svg'
import VisualIcon from '@/shared/icons/next/component.svg'
import { TabItemBadge } from '@/shared/ui/TabItem/components/TabItemBadge'
import ExperimentsIcon from '@/shared/icons/next/flask-conical.svg'
import { ReleaseCondition } from '@/widgets/ReleaseCondition'
import { CampaignHeader } from '@/widgets/CampaignHeader'

interface StreamHeaderProps {
  className?: string
}

export const CampaignHeaderLayout: FC<StreamHeaderProps> = ({ className }) => {
  const { campaignSlug, areaSlug, projectSlug, releaseCondition } = useCampaignHeader()

  return (
    <CampaignHeader
      campaignID={+campaignSlug}
      header={
        <Link type='area'>
          <Touchable className={styles.backAction} effect='none'>
            <ArrowLeftIcon />
            Back to area
          </Touchable>
        </Link>
      }
      meta={releaseCondition && <ReleaseCondition editable releaseCondition={releaseCondition} />}
      footer={
        <>
          <Tabs>
            <Link type='campaign' areaSlug={areaSlug} projectSlug={projectSlug}>
              {({ isActive }) => (
                <TabItem name='overview' icon={<OverviewIcon />} isActive={isActive}>
                  Overview
                </TabItem>
              )}
            </Link>
            <Link type='campaignContent' areaSlug={areaSlug} projectSlug={projectSlug} campaignSlug={campaignSlug}>
              {({ isActive }) => (
                <TabItem name='areaContent' icon={<VisualIcon />} isActive={isActive}>
                  Content
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
          </Tabs>
        </>
      }
    />
  )
}
