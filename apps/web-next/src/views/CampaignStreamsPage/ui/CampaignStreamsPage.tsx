'use client'
import { FC } from 'react'
import styles from './styles.module.css'
import { Container } from '@/shared/ui/Container'
import { StreamPreviewItem } from '@/widgets/campaigns/StreamPreviewItem'
import { InputText } from '@/shared/ui/InputText'
import { Button } from '@/shared/ui/Button'
import PlusIcon from '@/shared/icons/next/plus.svg'
import { useCampaignDetailPage } from '../hooks/useCampaignDetailPage'
import { Chip } from '@/shared/ui/Chip/ui/Chip'
import { Link } from '@/shared/ui/Link'

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
          <Link type='stream' key={stream.id} streamSlug={stream.id}>
            <StreamPreviewItem name={stream.name} id={stream.id} weight={stream.weight} active={stream.active} />
          </Link>
        ))}
      </div>
    </div>
  )
}
