import { useCampaignContentQuery } from '../queries/CampaignContent.generated'
import { useModal } from '@/shared/hooks/useModal'
import { modalNames } from '@/shared/data'
import { RotationType, VariantStatus } from '@/__generated__/types'
import { useVariantsRolloutQuery } from '@/views/AreasFragmentPage/widgets/CampaignContentTable/queries/VariantsRollout.generated'
import { useCallback, useEffect, useMemo } from 'react'
import { useUpdateFeatureFlagMutation } from '@/shared/api/fatureFlag/mutation/UpdateFeatureFlag.generated'
import { useCreateFeatureFlagVariantMutation } from '@/shared/api/featureFlagVariant/mutations/CreateFeatureFlagVariant.generated'
import { useRemoveFeatureFlagVariantMutation } from '@/shared/api/featureFlagVariant/mutations/RemoveFeatureFlagVariant.generated'
import { useUpdateFeatureFlagVariantMutation } from '@/shared/api/featureFlagVariant/mutations/UpdateFeatureFlagVariant.generated'
import { useEqualizeRolloutMutation } from '@/views/AreasFragmentPage/widgets/CampaignContentTable/queries/EqualizeRollout.generated'
import { useDateCompare } from '@/shared/hooks/useDateCompare'

export const useCampaignContentTable = (campaignId: number) => {
  const { open: openModal, close: closeModal } = useModal()
  const dateCompare = useDateCompare('today')

  const [createVariant, { loading: creatingVariant }] = useCreateFeatureFlagVariantMutation()
  const [removeVariant, { loading: removingVariant }] = useRemoveFeatureFlagVariantMutation()
  const [updateVariant] = useUpdateFeatureFlagVariantMutation()
  const [updateFeatureFlag] = useUpdateFeatureFlagMutation()
  const [equalizeRollout, { loading: equalizeRolloutLoading }] = useEqualizeRolloutMutation()

  const { data, loading } = useCampaignContentQuery({
    variables: {
      id: campaignId,
      ...dateCompare
    },
    skip: !campaignId
  })

  const campaign = data?.campaign?.at(0)
  const featureFlag = campaign?.featureFlag
  const variants = useMemo(
    () =>
      (featureFlag?.variants ?? []).map(variant => ({
        ...variant,
        statistic: data?.campaignStatistic?.at(0)?.variants?.find(el => el.variantId === variant.id)
      })),
    [data?.campaignStatistic, featureFlag?.variants]
  )

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
      countVariants: variants?.length,
      onSubmit: async nextVariant => {
        await createVariant({
          variables: {
            featureFlagId: campaign?.featureFlag?.id,
            name: nextVariant.name,
            rollout: nextVariant.rollout,
            status: nextVariant.status,
            fragment: {
              fragmentId: nextVariant?.fragment.id,
              props: nextVariant?.fragment.props
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
        isEdit: true,
        countVariants: variants.length,
        initialState: {
          ...variant,
          rollout: variant.rolloutPercentage,
          fragment: {
            id: variant.fragment?.fragment.id,
            props: variant?.fragment?.props
          }
        },
        onSubmit: async nextVariant => {
          await updateVariant({
            variables: {
              id: variant?.id,
              name: nextVariant.name,
              rollout: nextVariant.rollout,
              status: nextVariant.status,
              fragment: {
                fragmentId: nextVariant.fragment.id,
                props: nextVariant.fragment.props
              }
            }
          })

          refetch()

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
        fragmentId,
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

  const handleEqualizeRollout = async () => {
    await equalizeRollout({
      variables: {
        featureFlagId: featureFlag?.id
      }
    })
    refetch()
  }

  const toggleVariantStatus = useCallback(
    (variantId: number) => {
      const variant = variants?.find(el => el.id === variantId)

      updateVariant({
        variables: {
          id: variant?.id,
          status: variant?.status === VariantStatus.Active ? VariantStatus.Inactive : VariantStatus.Active
        }
      })

      refetch()
    },
    [variants]
  )

  useEffect(() => {
    refetch()
  }, [refetch, variants.length])

  return {
    featureFlag,
    variantsRollout,
    loadingVariantsRollout,
    variants,
    loadingVariants: loading,
    equalizeRolloutLoading,
    creatingVariant,
    toggleVariantStatus,
    removeVariant,
    removingVariant,
    handleAddVariant,
    handleSetRotationType,
    handleEditFragment,
    handleEditVariant,
    handleEqualizeRollout
  }
}
