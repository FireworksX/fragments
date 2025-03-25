'use client'
import styles from './styles.module.css'
import { Container } from '@/shared/ui/Container'
import { CampaignPreviewItem } from '@/widgets/campaigns/CampaignPreviewItem'
import { InputText } from '@/shared/ui/InputText'
import { Button } from '@/shared/ui/Button'
import PlusIcon from '@/shared/icons/next/plus.svg'
import { useCampaignsList } from '../hooks/useCampaignsList'
import CloseIcon from '@/shared/icons/next/close.svg'
import CheckIcon from '@/shared/icons/next/check.svg'

export const CampaignsListLayout = ({ children }) => {
  const {
    creatingInputRef,
    handleCreateCampaign,
    creatingName,
    setCreatingName,
    createCampaignLoading,
    list,
    isCreating,
    setIsCreating
  } = useCampaignsList()

  return (
    <div className={styles.root}>
      <div className={styles.body}>
        <div className={styles.aside}>
          <Container className={styles.asideHeader}>
            {isCreating ? (
              <div className={styles.asideCreating}>
                <div className={styles.row}>
                  <Button stretched mode='secondary' icon={<CloseIcon />} onClick={() => setIsCreating(false)}>
                    Cancel
                  </Button>
                  <Button
                    stretched
                    disabled={creatingName?.length <= 2}
                    mode='success'
                    icon={<CheckIcon />}
                    loading={createCampaignLoading}
                    onClick={handleCreateCampaign}
                  >
                    Create
                  </Button>
                </div>
                <InputText
                  ref={creatingInputRef}
                  className={styles.searchInput}
                  placeholder='Campaign name'
                  mode='secondary'
                  value={creatingName}
                  onChangeValue={setCreatingName}
                />
              </div>
            ) : (
              <>
                <InputText className={styles.searchInput} placeholder='Search' mode='secondary' />
                <Button icon={<PlusIcon />} loading={createCampaignLoading} onClick={() => setIsCreating(true)}>
                  Create
                </Button>
              </>
            )}
          </Container>
          {list.map(campaign => (
            <CampaignPreviewItem
              key={campaign.id}
              className={styles.card}
              name={campaign.name}
              slug={campaign.id}
              isActive={campaign.active}
            />
          ))}
        </div>

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  )
}
