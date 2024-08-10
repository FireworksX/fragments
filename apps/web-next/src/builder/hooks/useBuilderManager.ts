import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { createConstants } from '@fragments/utils'
import { LinkKey } from '@graph-state/core'

export const builderModes = createConstants('preview', 'edit')
export const builderOptions = createConstants('mode', 'focus', 'textEditing')

interface BuilderManagerParameters {
  mode?: keyof typeof builderModes
  focus?: LinkKey
  textEditing?: boolean
}

export const useBuilderManager = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const urlMode = searchParams.get(builderOptions.mode)
  const textEditing = searchParams.get(builderOptions.textEditing)
  const resolvedMode = Object.keys(builderModes).some(mode => mode === urlMode) ? urlMode : builderModes.preview

  const updateUrl = (searchParams: URLSearchParams) => {
    const search = searchParams.toString()
    const query = search ? `?${search}` : ''

    router.replace(`${pathname}${query}`)
  }

  const updateParams = (params: BuilderManagerParameters) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))

    Object.entries(params).forEach(([key, value]) => {
      if (key === 'mode') {
        if (value === builderModes.preview) {
          current.delete(builderOptions.mode)
        } else {
          current.set(builderOptions.mode, value)
        }
      }

      if (key === 'textEditing') {
        if (!value) {
          current.delete(builderOptions.textEditing)
        } else {
          current.set(builderOptions.textEditing, '1')
        }
      }

      if (key === 'focus') {
        if (!value) {
          current.delete(builderOptions.focus)
        } else {
          current.set(builderOptions.focus, value)
        }
      }
    })

    updateUrl(current)
  }

  return {
    mode: resolvedMode,
    isEdit: resolvedMode === builderModes.edit,
    focus: searchParams.get(builderOptions.focus),
    isTextEditing: textEditing === '1',
    updateParams
  }
}
