import { useMutation, useQuery } from '@apollo/client'
import { CREATE_CAMPAIGN } from '../lib/createCampaign'
import { modalStore } from '@/shared/store/modal.store'
import { modalNames } from '@/shared/data'
import { useGraph } from '@graph-state/react'
import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { campaignsList } from '../lib/campaingsList'
import { useCampaignsListQuery } from '@/views/CampaignsListLayout/queries/CampaingsList.generated'
import { useCreateCampaignMutation } from '@/views/CampaignsListLayout/queries/CreateCampaign.generated'

export const useCampaignsList = () => {
  const { projectSlug } = useParams()
  const [, updateModal] = useGraph(modalStore, modalStore.key)
  const [createCampaign, { data: createdCampaign, loading: createCampaignLoading }] = useCreateCampaignMutation()
  const { data: campaignsListData } = useCampaignsListQuery({
    variables: {
      projectId: +projectSlug
    }
  })

  const handleCreateCampaign = () => {
    modalStore.open(modalNames.createCampaign, {
      onCreate: async campaign => {
        await createCampaign({
          variables: {
            projectId: +projectSlug,
            name: campaign.name,
            description: campaign.description
          }
        })

        modalStore.close()
      }
    })
  }

  useEffect(() => {
    updateModal({
      context: {
        loading: createCampaignLoading
      }
    })
  }, [createCampaignLoading])

  return {
    list: campaignsListData?.campaign ?? [],
    handleCreateCampaign,
    createCampaignLoading
  }
}
