import { use } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useSearchParam } from '@/shared/hooks/useSearchParams'
import { LinkKey } from '@graph-state/core'

export const useBuilder = () => {
  const { builderManager } = use(BuilderContext)
  const [currentFragmentId, setCurrentFragmentId] = useSearchParam('node')

  const openFragment = (fragmentLink: LinkKey) => {
    const { _id } = builderManager.entityOfKey(fragmentLink) ?? {}
    setCurrentFragmentId(_id)
  }

  return {
    currentFragmentId,
    openFragment
  }
}
