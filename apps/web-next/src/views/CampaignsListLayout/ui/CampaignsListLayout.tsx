'use client'
import styles from './styles.module.css'
import { Container } from '@/shared/ui/Container'
import { CampaignPreviewItem } from '@/widgets/campaigns/CampaignPreviewItem'
import { InputText } from '@/shared/ui/InputText'
import { Button } from '@/shared/ui/Button'
import PlusIcon from '@/shared/icons/next/plus.svg'
import { useCampaignsList } from '../hooks/useCampaignsList'
import { CreateCampaignModal } from '@/widgets/modals/CreateCampaignModal'

export const CampaignsListLayout = ({ children }) => {
  const { handleCreateCampaign, createCampaignLoading, list } = useCampaignsList()

  return (
    <div className={styles.root}>
      <div className={styles.body}>
        <div className={styles.aside}>
          <Container className={styles.asideHeader}>
            <InputText className={styles.searchInput} placeholder='Search' mode='secondary' />
            <Button icon={<PlusIcon />} loading={createCampaignLoading} onClick={handleCreateCampaign}>
              Add
            </Button>
          </Container>
          {list.map(campaign => (
            <CampaignPreviewItem
              key={campaign.id}
              className={styles.card}
              name={campaign.name}
              isActive={campaign.active}
            />
          ))}
        </div>

        <div className={styles.content}>{children}</div>
      </div>

      <CreateCampaignModal />
    </div>
  )
}
