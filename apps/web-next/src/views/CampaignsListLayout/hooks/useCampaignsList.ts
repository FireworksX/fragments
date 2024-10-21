import { useMutation, useQuery } from '@apollo/client'
import { CREATE_CAMPAIGN } from '../lib/createCampaign'
import { modalStore } from '@/shared/store/modal.store'
import { modalNames } from '@/shared/data'
import { useGraph } from '@graph-state/react'
import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { campaignsList } from '../lib/campaingsList'

export const useCampaignsList = () => {
  const { projectSlug } = useParams()
  const [, updateModal] = useGraph(modalStore, modalStore.key)
  const [createCampaign, { data: createdCampaign, loading: createCampaignLoading }] = useMutation(CREATE_CAMPAIGN)
  const { data: campaignsListData, loading: campaignsListLoading } = useQuery(campaignsList, {
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
