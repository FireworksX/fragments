'use client'
import { FC } from 'react'
import styles from './styles.module.css'
import { Container } from '@/shared/ui/Container'
import { InputText } from '@/shared/ui/InputText'
import { Button } from '@/shared/ui/Button'
import PlusIcon from '@/shared/icons/next/plus.svg'
import ExportIcon from '@/shared/icons/next/download.svg'
import SettingsIcon from '@/shared/icons/next/settings.svg'
import CheckIcon from '@/shared/icons/next/check.svg'
import CloseIcon from '@/shared/icons/next/close.svg'
import { useCampaignDetailPage } from '../hooks/useCampaignDetailPage'
import { StreamsTable } from '@/views/AreasStreamsPage/widgets/StreamsTable'

interface CampaignStreamsPageProps {}

export const AreasStreamsPage: FC<CampaignStreamsPageProps> = () => {
  const { creatingStream, clickCreateStream, handleCreateStream, tableRef } = useCampaignDetailPage()

  return (
    <Container className={styles.root}>
      <div className={styles.header}>
        <InputText className={styles.search} placeholder='Search' />
        <Button mode='secondary' icon={<SettingsIcon />}>
          Customize
        </Button>
        <Button mode='secondary' icon={<ExportIcon />}>
          Export
        </Button>
        <Button icon={<PlusIcon />} loading={creatingStream} onClick={clickCreateStream}>
          Create Campaign
        </Button>
      </div>

      <StreamsTable ref={tableRef} onCreate={handleCreateStream} />
    </Container>
  )
}
