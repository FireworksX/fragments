import { useParams } from 'next/navigation'
import { ComponentRef, useEffect, useRef, useState } from 'react'
import { useCreateLandingMutation } from '../queries/CreateLanding.generated'
import { useLandingsListQuery } from '../queries/LandingsList.generated'

export const useStreamLandings = () => {
  const { streamSlug, landingId, campaignSlug, projectSlug } = useParams()
  const [localName, setLocalName] = useState('')
  const [isNewMode, setIsNewMode] = useState(false)
  const createLandingRef = useRef<ComponentRef<'input'>>(null)

  const [executeCreateLanding, { loading: loadingCreateLanding }] = useCreateLandingMutation()
  const { data } = useLandingsListQuery({
    variables: {
      streamSlug: +streamSlug,
      landingId: +landingId
    }
  })
  const landings = data?.landing ?? []

  const handleCreateLanding = async () => {
    await executeCreateLanding({
      variables: {
        streamSlug: +streamSlug,
        name: localName
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
