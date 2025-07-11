import { useCampaignContentQuery } from '../queries/CampaignContent.generated'
import { useModal } from '@/shared/hooks/useModal'
import { modalNames } from '@/shared/data'
import { RotationType } from '@/__generated__/types'
import { useVariantsRolloutQuery } from '@/views/AreasFragmentPage/widgets/CampaignContentTable/queries/VariantsRollout.generated'
import { useEffect } from 'react'
import { useUpdateFeatureFlagMutation } from '@/shared/api/fatureFlag/mutation/UpdateFeatureFlag.generated'
import { useCreateFeatureFlagVariantMutation } from '@/shared/api/featureFlagVariant/mutations/CreateFeatureFlagVariant.generated'
import { useRemoveFeatureFlagVariantMutation } from '@/shared/api/featureFlagVariant/mutations/RemoveFeatureFlagVariant.generated'
import { useUpdateFeatureFlagVariantMutation } from '@/shared/api/featureFlagVariant/mutations/UpdateFeatureFlagVariant.generated'

export const useCampaignContentTable = (campaignId: number) => {
  const { openModal, closeModal } = useModal()

  const [createVariant, { loading: creatingVariant }] = useCreateFeatureFlagVariantMutation()
  const [removeVariant, { loading: removingVariant }] = useRemoveFeatureFlagVariantMutation()
  const [updateVariant] = useUpdateFeatureFlagVariantMutation()
  const [updateFeatureFlag] = useUpdateFeatureFlagMutation()

  const { data, loading } = useCampaignContentQuery({
    variables: {
      id: campaignId
    }
  })
  const campaign = data?.campaign?.at(0)
  const featureFlag = campaign?.featureFlag
  const variants = featureFlag?.variants ?? []

  const {
    data: variantsRolloutData,
    loading: loadingVariantsRollout,
    refetch
  } = useVariantsRolloutQuery({
    variables: {
      featureFlagId: campaign?.featureFlag?.id!
    },
    skip: !campaign?.featureFlag?.id
  })

  const variantsRollout = variantsRolloutData?.featureFlag?.variants ?? []

  const handleAddVariant = () => {
    openModal(modalNames.configureFeatureFlagVariant, {
      countVariants: campaign?.featureFlag?.variants?.length,
      onSubmit: async nextVariant => {
        await createVariant({
          variables: {
            featureFlagId: campaign?.featureFlag?.id,
            name: nextVariant.name,
            rollout: nextVariant.rollout,
            status: nextVariant.status,
            fragment: {
              fragmentId: nextVariant?.fragmentId,
              props: nextVariant?.fragmentProps
            }
          }
        })

        closeModal()
      }
    })
  }

  const handleEditVariant = (variantId: number) => {
    const variant = variants?.find(el => el.id === variantId)

    if (variant) {
      openModal(modalNames.configureFeatureFlagVariant, {
        initialState: {
          ...variant,
          fragmentId: variant.fragment?.fragment.id,
          fragmentProps: variant?.fragment?.props
        },
        onSubmit: async nextVariant => {
          await updateVariant({
            variables: {
              id: nextVariant?.id,
              name: nextVariant.name,
              rollout: nextVariant.rollout,
              status: nextVariant.status,
              fragment: {
                fragmentId: nextVariant?.fragmentId,
                props: nextVariant?.fragmentProps
              }
            }
          })

          closeModal()
        }
      })
    }
  }

  const handleEditFragment = (variantId: number) => {
    const variant = variants?.find(el => el.id === variantId)

    if (variant) {
      const fragmentId = variant?.fragment?.fragment?.id

      openModal(modalNames.configureFragmentVariant, {
        fragment: fragmentId,
        initialProps: variant?.fragment?.props,
        onSubmit: async props => {
          await updateVariant({
            variables: {
              id: variantId,
              fragment: {
                fragmentId: fragmentId,
                props
              }
            }
          })

          closeModal()
        }
      })
    }
  }

  const handleSetRotationType = (type: RotationType) => {
    updateFeatureFlag({
      variables: {
        id: featureFlag?.id!,
        rotationType: type
      }
    })
  }

  useEffect(() => {
    refetch()
  }, [refetch, variants.length])

  return {
    featureFlag,
    variantsRollout,
    loadingVariantsRollout,
    variants,
    loadingVariants: loading,
    creatingVariant,
    removeVariant,
    removingVariant,
    handleAddVariant,
    handleSetRotationType,
    handleEditFragment,
    handleEditVariant
  }
}
