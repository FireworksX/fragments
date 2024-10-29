'use client'
import { useMutation, useQuery } from '@apollo/client'
import { useParams, useSearchParams } from 'next/navigation'
import { STREAM_DETAIL, STREAM_FRAGMENTS, STREAM_LANDINGS } from '@/shared/api/stream/query/streamDetail'
import { CHANGE_STREAM_ACTIVE } from '@/shared/api/stream/mutation/changeStreamActive'
import { LANDINGS_LIST } from '@/shared/api/landing/query/landingsList'
import { CREATE_LANDING } from '@/shared/api/landing/mutation/createLanding'
import { ElementRef, useEffect, useRef, useState } from 'react'

export const useStreamDetailPage = () => {
  const { streamSlug, campaignSlug, projectSlug } = useParams()
  const [localName, setLocalName] = useState('')
  const [isNewMode, setIsNewMode] = useState(false)
  const createLandingRef = useRef<ElementRef<'input'>>(null)

  const [executeCreateLanding, { loading: loadingCreateLanding }] = useMutation(CREATE_LANDING)
  const { data } = useQuery(LANDINGS_LIST, {
    variables: {
      streamSlug: +streamSlug
    }
  })
  const landings = data?.streamFragment ?? []

  const handleCreateLanding = async () => {
    await executeCreateLanding({
      variables: {
        streamSlug: +streamSlug,
        name: localName,
        weight: 100
      }
    })

    setLocalName('')
    setIsNewMode(false)
  }

  useEffect(() => {
    if (isNewMode) {
      createLandingRef?.current?.focus()
    }
  }, [isNewMode])

  return {
    landings,
    loadingCreateLanding,
    // toggleActive,
    // isEditMode: searchParams.get('editMode') === 'true',
    projectSlug,
    campaignSlug,
    streamSlug,
    isNewMode,
    setIsNewMode,
    handleCreateLanding,
    localName,
    setLocalName,
    createLandingRef
  }
}
