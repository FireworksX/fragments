import { useParams } from 'next/navigation'
import { useCreateCampaignMutation } from '../queries/CreateCampaign.generated'
import { useCampaignsListQuery } from '../queries/CampaingsList.generated'

export const useCampaignsListAside = () => {
  const { projectSlug } = useParams()
  const [createCampaign, { data: createdCampaign, loading: createCampaignLoading }] = useCreateCampaignMutation()
  const { data: campaignsListData } = useCampaignsListQuery({
    variables: {
      projectId: +projectSlug
    }
  })

  const handleCreateCampaign = async name => {
    await createCampaign({
      variables: {
        projectId: +projectSlug,
        name
      }
    })
  }

  return {
    list: campaignsListData?.campaign ?? [],
    handleCreateCampaign,
    createCampaignLoading
  }
}
