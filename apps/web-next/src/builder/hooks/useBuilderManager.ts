import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { createConstants } from '@fragments/utils'
import { LinkKey } from '@graph-state/core'

export const builderModes = createConstants('preview', 'edit')
export const builderOptions = createConstants('mode', 'focus')

export const useBuilderManager = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const urlMode = searchParams.get(builderOptions.mode)
  const resolvedMode = Object.keys(builderModes).some(mode => mode === urlMode) ? urlMode : builderModes.preview

  const updateUrl = (searchParams: URLSearchParams) => {
    const search = searchParams.toString()
    const query = search ? `?${search}` : ''
    router.replace(`${pathname}${query}`)
  }

  const changeMode = (mode: keyof typeof builderModes) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))

    if (mode === builderModes.preview) {
      current.delete(builderOptions.mode)
    } else {
      current.set(builderOptions.mode, mode)
    }

    updateUrl(current)
  }

  const setFocusNode = (nodeLink?: LinkKey) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))

    if (!nodeLink) {
      current.delete(builderOptions.focus)
    } else {
      current.set(builderOptions.focus, nodeLink)
    }

    updateUrl(current)
  }

  return {
    mode: resolvedMode,
    isEdit: resolvedMode === builderModes.edit,
    changeMode,
    focus: searchParams.get(builderOptions.focus),
    setFocusNode
  }
}
