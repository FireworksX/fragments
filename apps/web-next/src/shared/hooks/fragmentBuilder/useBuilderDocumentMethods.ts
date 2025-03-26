import { useBuilderDocumentManager } from '@/shared/hooks/fragmentBuilder/useBuilderDocumentManager'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { use } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { createFragmentInstance } from '@/shared/store/builderStore/plugins/creatorPlugin/createFragmentInstance'
import { LinkKey } from '@graph-state/core'
import { definition } from '@fragments/definition'

export const useBuilderDocumentMethods = () => {
  const { builderManager } = use(BuilderContext)
  const { createDocumentManager } = useBuilderDocumentManager()
  const { documentManager } = useBuilderDocument()

  const insertFragment = async (fragmentSlug: number, to: LinkKey) => {
    const insertManager = await createDocumentManager(fragmentSlug)

    if (documentManager && insertManager) {
      documentManager.$fragment.linkFragments([insertManager])
      const instanceNode = builderManager?.$creator.createFragmentInstance(
        builderManager,
        to,
        `${definition.nodes.Fragment}:${fragmentSlug}`
      )
    }
  }

  return {
    insertFragment
  }
}
