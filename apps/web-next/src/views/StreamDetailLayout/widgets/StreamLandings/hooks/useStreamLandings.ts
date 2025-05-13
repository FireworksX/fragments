import { useParams } from 'next/navigation'
import { ComponentRef, useEffect, useRef, useState } from 'react'
import { useCreateLandingMutation } from '../queries/CreateLanding.generated'
import { useLandingsListQuery } from '../queries/LandingsList.generated'
import useClickOutside from '@/shared/hooks/useClickOutside'

export const useStreamLandings = () => {
  const { streamSlug, landingId, campaignSlug, projectSlug } = useParams()
  const [localName, setLocalName] = useState<null | string>(null)
  const createInputRef = useRef<ComponentRef<'input'>>(null)
  const creatingRef = useRef(null)
  const isCreating = typeof localName === 'string'

  useClickOutside({ ref: creatingRef, onClickOutside: () => setLocalName(null) })

  const [executeCreateLanding, { loading: loadingCreateLanding }] = useCreateLandingMutation()
  const { data } = useLandingsListQuery({
    variables: {
      streamSlug: +streamSlug,
      landingId: +landingId
    }
  })
  const landings = data?.landing ?? []

  const handleCreateLanding = async e => {
    e.preventDefault()
    e.stopPropagation()
    await executeCreateLanding({
      variables: {
        streamSlug: +streamSlug,
        name: localName
      }
    })

    setLocalName(null)
  }

  useEffect(() => {
    if (isCreating) {
      createInputRef?.current?.focus()
    }
  }, [isCreating])

  return {
    creatingRef,
    isCreating,
    landings,
    loadingCreateLanding,
    // toggleActive,
    // isEditMode: searchParams.get('editMode') === 'true',
    projectSlug,
    campaignSlug,
    streamSlug,
    handleCreateLanding,
    localName,
    setLocalName,
    createInputRef
  }
}
