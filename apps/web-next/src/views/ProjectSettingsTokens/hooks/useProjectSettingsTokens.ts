import { ComponentRef, useEffect, useRef, useState } from 'react'
import { useProjectTokensQuery } from '@/views/ProjectSettingsTokens/queries/ProjectTokens.generated'
import { useProject } from '@/shared/hooks/useProject'
import { useCreatePublicTokenMutation } from '@/views/ProjectSettingsTokens/queries/CreatePublicToken.generated'
import { useRefreshPrivateKeyMutation } from '@/views/ProjectSettingsTokens/queries/RefreshPrivateKey.generated'

export const useProjectSettingsTokens = () => {
  const { projectSlug } = useProject()
  const creatingInputRef = useRef<ComponentRef<'input'>>(null)
  const [isCreatingToken, setIsCreatingToken] = useState(false)
  const [creatingName, setCreatingName] = useState('')

  const { data, loading } = useProjectTokensQuery({ variables: { projectId: projectSlug } })
  const publicTokens = data?.project?.at(0)?.publicKeys ?? []
  const privateKey = data?.project?.at(0)?.privateKey ?? null

  const [handleCreatePublicToken, { loading: creatingPublicToken }] = useCreatePublicTokenMutation({
    variables: {
      projectId: projectSlug
    }
  })
  const [handleRefreshPrivateToken, { loading: refreshingPrivateToken }] = useRefreshPrivateKeyMutation({
    variables: {
      projectId: projectSlug
    }
  })

  useEffect(() => {
    if (isCreatingToken) {
      creatingInputRef?.current?.focus()
    } else {
      setCreatingName('')
    }
  }, [isCreatingToken])

  return {
    privateKey,
    publicTokens,
    loading,
    creatingName,
    setCreatingName,
    handleRefreshPrivateToken,
    refreshingPrivateToken,
    creatingInputRef,
    isCreatingToken,
    setIsCreatingToken,
    handleCreatePublicToken: async () => {
      await handleCreatePublicToken()
      setIsCreatingToken(false)
    },
    creatingPublicToken
  }
}
