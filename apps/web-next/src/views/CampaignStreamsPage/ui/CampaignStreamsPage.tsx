'use client'
import { FC } from 'react'
import styles from './styles.module.css'
import { Container } from '@/shared/ui/Container'
import { StreamPreviewItem } from '@/widgets/campaigns/StreamPreviewItem'
import { InputText } from '@/shared/ui/InputText'
import { Button } from '@/shared/ui/Button'
import PlusIcon from '@/shared/icons/next/plus.svg'
import CheckIcon from '@/shared/icons/next/check.svg'
import CloseIcon from '@/shared/icons/next/close.svg'
import { useCampaignDetailPage } from '../hooks/useCampaignDetailPage'
import { Link } from '@/shared/ui/Link'

interface CampaignStreamsPageProps {}

export const CampaignStreamsPage: FC<CampaignStreamsPageProps> = () => {
  const {
    streams,
    creatingStream,
    creatingName,
    setCreatingName,
    creatingRef,
    handleCreateStream,
    isCreating,
    setIsCreating
  } = useCampaignDetailPage()

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        {isCreating ? (
          <>
            <InputText
              ref={creatingRef}
              placeholder='Stream name'
              value={creatingName}
              onChangeValue={setCreatingName}
            />
            <Button
              loading={creatingStream}
              disabled={creatingName?.length <= 2}
              mode='success'
              icon={<CheckIcon />}
              onClick={handleCreateStream}
            >
              Create
            </Button>
            <Button mode='secondary' icon={<CloseIcon />} onClick={() => setIsCreating(false)}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <InputText placeholder='Search' />
            <Button icon={<PlusIcon />} onClick={() => setIsCreating(true)}>
              Create
            </Button>
          </>
        )}
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
