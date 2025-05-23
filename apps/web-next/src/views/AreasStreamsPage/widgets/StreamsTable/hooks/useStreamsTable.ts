import { ComponentRef, useImperativeHandle, useRef, useState } from 'react'
import useClickOutside from '@/shared/hooks/useClickOutside'
import { nextTick } from '@/shared/utils/nextTick'
import { useListSteamsQuery } from '../queries/ListStreams.generated'
import { useParams } from 'next/navigation'
import { useDeleteCampaignMutation } from '@/shared/api/stream/mutation/DeleteCampaign.generated'
import {
  UpdateCampaignMutationVariables,
  useUpdateCampaignMutation
} from '@/shared/api/stream/mutation/UpdateCampaign.generated'

export const useStreamsTable = (ref: unknown, onCreate: unknown) => {
  const { areaSlug } = useParams()
  const [creatingName, setCreatingName] = useState<null | string>(null)
  const creatingInputRef = useRef<ComponentRef<'input'>>(null)
  const creatingRowRef = useRef<ComponentRef<'tr'>>(null)
  const isCreating = typeof creatingName === 'string'

  const [handleUpdateUpdateStream] = useUpdateCampaignMutation()
  const [handleDeleteStream] = useDeleteCampaignMutation()

  const { data: listStreams } = useListSteamsQuery({
    variables: {
      campaignSlug: +areaSlug
    }
  })

  useClickOutside({
    ref: creatingRowRef,
    onClickOutside: () => {
      setCreatingName(null)
    }
  })

  useImperativeHandle(ref, () => ({
    createNew: () => {
      setCreatingName('')
      nextTick(() => {
        creatingInputRef?.current?.focus()
      })
    }
  }))

  const updateStream = (variables: UpdateCampaignMutationVariables) => {
    handleUpdateUpdateStream({
      variables
    })
  }

  return {
    areaSlug,
    list: listStreams?.stream ?? [],
    creatingRowRef,
    isCreating,
    creatingInputRef,
    handleCreate: e => {
      e?.preventDefault()
      e?.stopPropagation()
      onCreate?.(creatingName)
      setCreatingName(null)
    },
    creatingName,
    setCreatingName,
    updateStream,
    handleDeleteStream
  }
}
