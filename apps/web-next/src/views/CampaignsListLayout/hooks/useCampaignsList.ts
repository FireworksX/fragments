import { modalStore } from '@/shared/store/modal.store'
import { modalNames } from '@/shared/data'
import { useGraph } from '@graph-state/react'
import { ComponentRef, useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import { useCampaignsListQuery } from '@/views/CampaignsListLayout/queries/CampaingsList.generated'
import { useCreateCampaignMutation } from '@/views/CampaignsListLayout/queries/CreateCampaign.generated'

export const useCampaignsList = () => {
  const { projectSlug } = useParams()
  const creatingInputRef = useRef<ComponentRef<'input'>>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [creatingName, setCreatingName] = useState('')
  const [createCampaign, { data: createdCampaign, loading: createCampaignLoading }] = useCreateCampaignMutation()
  const { data: campaignsListData } = useCampaignsListQuery({
    variables: {
      projectId: +projectSlug
    }
  })

  useEffect(() => {
    if (!isCreating) {
      setCreatingName('')
    } else {
      creatingInputRef?.current?.focus()
    }
  }, [isCreating])

  const handleCreateCampaign = async () => {
    await createCampaign({
      variables: {
        projectId: +projectSlug,
        name: creatingName
      }
    })

    setIsCreating(false)
  }

  return {
    creatingInputRef,
    creatingName,
    setCreatingName,
    isCreating,
    list: campaignsListData?.campaign ?? [],
    handleCreateCampaign,
    createCampaignLoading,
    setIsCreating
  }
}
