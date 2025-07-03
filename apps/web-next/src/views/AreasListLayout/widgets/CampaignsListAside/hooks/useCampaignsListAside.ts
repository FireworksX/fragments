import { useParams } from 'next/navigation'
import { generateId } from '@fragmentsx/utils'
import { useCreateAreaMutation } from '../queries/CreateArea.generated'
import { useAreasListQuery } from '../queries/AreasList.generated'

export const useCampaignsListAside = () => {
  const { projectSlug } = useParams()
  const [createArea, { data: createdCampaign, loading: createCampaignLoading }] = useCreateAreaMutation()
  const { data: campaignsListData } = useAreasListQuery({
    variables: {
      projectId: +projectSlug
    }
  })

  const handleCreate = async name => {
    await createArea({
      variables: {
        projectId: +projectSlug,
        name,
        areaCode: generateId()
      }
    })
  }

  return {
    list: campaignsListData?.area ?? [],
    handleCreate,
    createCampaignLoading
  }
}
