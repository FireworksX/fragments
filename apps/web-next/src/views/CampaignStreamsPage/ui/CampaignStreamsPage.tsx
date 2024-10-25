'use client'
import { FC } from 'react'
import styles from './styles.module.css'
import { Container } from '@/shared/ui/Container'
import { StreamPreviewItem } from '@/widgets/campaigns/StreamPreviewItem'
import ConfigureStreamModal from '../../../widgets/modals/ConfigureStreamModal/ui/ConfigureStreamModal'
import { InputText } from '@/shared/ui/InputText'
import { Button } from '@/shared/ui/Button'
import PlusIcon from '@/shared/icons/next/plus.svg'
import { useCampaignDetailPage } from '../hooks/useCampaignDetailPage'
import { Chip } from '@/shared/ui/Chip/ui/Chip'

interface CampaignStreamsPageProps {}

export const CampaignStreamsPage: FC<CampaignStreamsPageProps> = () => {
  const { streams } = useCampaignDetailPage()

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <InputText placeholder='Search' />
        <Button icon={<PlusIcon />}>Create</Button>
      </div>

      <div className={styles.body}>
        {streams.map(stream => (
          <StreamPreviewItem
            key={stream.id}
            name={stream.name}
            id={stream.id}
            weight={stream.weight}
            active={stream.active}
          />
        ))}
      </div>

      {/*<ConfigureStreamModal />*/}
    </div>
  )
}
