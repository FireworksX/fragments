import { ComponentRef, useImperativeHandle, useRef, useState } from 'react'
import useClickOutside from '@/shared/hooks/useClickOutside'
import { nextTick } from '@/shared/utils/nextTick'
import { useListSteamsQuery } from '../queries/ListStreams.generated'
import { useParams } from 'next/navigation'
import {
  UpdateStreamMutationVariables,
  useUpdateStreamMutation
} from '@/shared/api/stream/mutation/UpdateStream.generated'
import { useDeleteStreamMutation } from '@/shared/api/stream/mutation/DeleteStream.generated'

export const useStreamsTable = (ref: unknown, onCreate: unknown) => {
  const { campaignSlug } = useParams()
  const [creatingName, setCreatingName] = useState<null | string>(null)
  const creatingInputRef = useRef<ComponentRef<'input'>>(null)
  const creatingRowRef = useRef<ComponentRef<'tr'>>(null)
  const isCreating = typeof creatingName === 'string'

  const [handleUpdateUpdateStream] = useUpdateStreamMutation()
  const [handleDeleteStream] = useDeleteStreamMutation()

  const { data: listStreams } = useListSteamsQuery({
    variables: {
      campaignSlug: +campaignSlug
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

  const updateStream = (variables: UpdateStreamMutationVariables) => {
    handleUpdateUpdateStream({
      variables
    })
  }

  return {
    campaignSlug,
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
