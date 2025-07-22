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
import { StreamsTable } from '@/views/AreasStreamsPage/widgets/StreamsTable'

interface CampaignStreamsPageProps {}

export const AreasStreamsPage: FC<CampaignStreamsPageProps> = () => {
  return (
    <Container className={styles.root}>
      <StreamsTable />
    </Container>
  )
}
