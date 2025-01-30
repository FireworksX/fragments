import { use, useEffect } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { useBuilder } from '@/shared/hooks/fragmentBuilder/useBuilder'
import { useApolloClient, useMutation, useQuery } from '@apollo/client'
import { FRAGMENT_DOCUMENT } from '@/shared/hooks/fragmentBuilder/useBuilderDocument/lib/fragmentDocument'
import { getEmptyFragment } from '@/shared/data/emptyFragment'
import { UPDATE_FRAGMENT_DOCUMENT } from '@/shared/hooks/fragmentBuilder/useBuilderDocument/lib/updateFragmentDocument'

export const useBuilderDocument = () => {
  const { builderManager } = use(BuilderContext)
  const [builderDocument] = useGraph(builderManager, builderManager.$documents.key)

  return {
    documentManager: builderDocument?.manager
  }
}
