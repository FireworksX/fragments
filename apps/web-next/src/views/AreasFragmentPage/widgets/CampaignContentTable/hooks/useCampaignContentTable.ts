import { useCampaignContentQuery } from '@/views/AreasFragmentPage/widgets/CampaignContentTable/queries/CampaignContent.generated'
import { useModal } from '@/shared/hooks/useModal'
import { modalNames } from '@/shared/data'

export const useCampaignContentTable = (campaignId: number) => {
  const { openModal } = useModal()

  const { data, loading } = useCampaignContentQuery({
    variables: {
      id: campaignId
    }
  })

  console.log(data, loading)

  const handleAddVariant = () => {
    openModal(modalNames.configureFeatureFlagVariant)
  }

  return {
    handleAddVariant
  }
}
