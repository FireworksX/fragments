import { useCampaignContentQuery } from '../queries/CampaignContent.generated'
import { useModal } from '@/shared/hooks/useModal'
import { modalNames } from '@/shared/data'
import { useCreateFeatureFlagVariantMutation } from '@/shared/api/fatureFlag/mutation/CreateFeatureFlagVariant.generated'
import { VariantStatus } from '@/__generated__/types'

export const useCampaignContentTable = (campaignId: number) => {
  const { openModal } = useModal()

  const [createVariant] = useCreateFeatureFlagVariantMutation()

  const { data, loading } = useCampaignContentQuery({
    variables: {
      id: campaignId
    }
  })
  const campaign = data?.campaign?.at(0)

  console.log(data, loading)

  const handleAddVariant = () => {
    openModal(modalNames.configureFeatureFlagVariant, {
      onSubmit: async featureFlag => {
        const r = await createVariant({
          variables: {
            featureFlagId: campaign?.featureFlag?.id,
            name: featureFlag.name,
            rollout: featureFlag.rollout,
            status: {
              active: VariantStatus.Active,
              pause: VariantStatus.Inactive
            }[featureFlag.status],
            fragment: {
              fragmentId: 1,
              props: {}
            }
          }
        })

        console.log(r)
      }
    })
  }

  return {
    handleAddVariant
  }
}
