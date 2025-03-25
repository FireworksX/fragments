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

interface CampaignDetailPageProps {}

export const CampaignDetailLayout: FC<CampaignDetailPageProps> = ({ children }) => {
  const {
    isStreamRoute,
    isEdit,
    setIsEdit,
    campaign,
    campaignSlug,
    projectSlug,
    loadingChangeCampaignActive,
    toggleActive
  } = useCampaignDetail()

  return (
    <Container className={styles.root}>
      {!isStreamRoute && (
        <>
          <div className={styles.header}>
            <div className={styles.logo}></div>
            <div className={styles.info}>
              <div className={styles.name}>
                {isEdit ? (
                  <InputText classNameInput={styles.nameInput} />
                ) : (
                  <>
                    {campaign?.name}
                    {campaign?.active && <span className={styles.liveBadge}>live</span>}
                  </>
                )}
              </div>
              {!isEdit && (
                <div className={styles.meta}>
                  <span>Start: 12.10.2025</span>
                  <span>End: 25.10.2025</span>
                </div>
              )}
            </div>

            <div className={styles.headerAside}>
              {!isEdit ? (
                <>
                  <ToggleActiveButton
                    isActive={campaign?.active}
                    loading={loadingChangeCampaignActive}
                    onClick={toggleActive}
                  />

                  <Button
                    mode='outline'
                    preventDefault
                    // loading={loadingUpdateStream}
                    icon={<EditIcon />}
                    onClick={() => setIsEdit(true)}
                  >
                    Edit
                  </Button>

                  <Button
                    mode='danger-outline'
                    preventDefault
                    // loading={loadingUpdateStream}
                    icon={<DeleteIcon />}
                    // onClick={toggleActive}
                  >
                    Delete
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    mode='success'
                    preventDefault
                    // loading={loadingUpdateStream}
                    icon={<CheckIcon />}
                    onClick={() => setIsEdit(true)}
                  >
                    Done
                  </Button>
                  <Button
                    mode='secondary'
                    preventDefault
                    // loading={loadingUpdateStream}
                    icon={<CloseIcon />}
                    onClick={() => setIsEdit(false)}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className={styles.description}>
            {isEdit ? (
              <Textarea />
            ) : (
              `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet corporis deserunt doloremque sunt voluptatum.
            Asperiores cum, debitis dolor eaque eos ex facere in inventore maiores minima modi, odit, perspiciatis
            tenetur.`
            )}
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
