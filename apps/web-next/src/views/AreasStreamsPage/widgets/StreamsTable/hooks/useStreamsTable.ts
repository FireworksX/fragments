import { useParams } from 'next/navigation'
import { useDeleteCampaignMutation } from '@/shared/api/stream/mutation/DeleteCampaign.generated'
import {
  UpdateCampaignMutationVariables,
  useUpdateCampaignMutation
} from '@/shared/api/stream/mutation/UpdateCampaign.generated'
import { useListCampaignsQuery } from '@/views/AreasStreamsPage/widgets/StreamsTable/queries/ListCampaigns.generated'
import { useModal } from '@/shared/hooks/useModal'
import { modalNames } from '@/shared/data'
import { useCreateCampaignMutation } from '@/views/AreasStreamsPage/widgets/StreamsTable/queries/CreateCampaign.generated'
import { CampaignStatus } from '@/__generated__/types'
import { useAreaDetailQuery } from '@/shared/api/area/query/AreaDetail.generated'

export const useStreamsTable = () => {
  const { open: openModal, close: closeModal } = useModal()
  const { areaSlug } = useParams()

  const [handleUpdateUpdateCampaignMutation] = useUpdateCampaignMutation()
  const [handleDeleteCampaignMutation] = useDeleteCampaignMutation()
  const [handleCreateCampaignMutation] = useCreateCampaignMutation()

  const { data: areaData } = useAreaDetailQuery({
    variables: {
      id: +areaSlug
    },
    fetchPolicy: 'cache-only'
  })

  const { data: campaignsData, loading } = useListCampaignsQuery({
    variables: {
      areaId: +areaSlug
    }
  })
  const campaigns = (campaignsData?.campaign ?? []).filter(el => el.id !== areaData?.area?.at(0)?.defaultCampaign?.id)

  const updateStream = (variables: UpdateCampaignMutationVariables) => {
    handleUpdateUpdateCampaignMutation({
      variables
    })
  }

  const handleCreateCampaign = () => {
    openModal(modalNames.configureCampaign, {
      countCampaigns: campaigns?.length,
      onSubmit: async nextCampaign => {
        await handleCreateCampaignMutation({
          variables: {
            areaId: +areaSlug,
            name: nextCampaign.name,
            status: CampaignStatus.Inactive
          }
        })

        closeModal()
      }
    })
  }

  return {
    loading,
    areaSlug,
    list: campaigns,
    updateStream,
    handleDeleteCampaignMutation,
    handleCreateCampaign
  }
}
