import { usePathname, useSearchParams, useRouter, useParams } from 'next/navigation'
import { createConstants } from '@fragments/utils'
import { LinkKey } from '@graph-state/core'

export const builderViews = createConstants('preview', 'edit')
export const builderOptions = createConstants('focus', 'textEditing')

interface BuilderManagerParameters {
  focus?: LinkKey
  textEditing?: boolean
}

export const useBuilderManager = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { fragment } = useParams()
  const [fragmentSlug, view] = fragment || []
  const textEditing = searchParams.get(builderOptions.textEditing)
  const resolvedMode = Object.keys(builderViews).some(mode => mode === view) ? view : builderViews.preview

  const updateUrl = (searchParams: URLSearchParams) => {
    const search = searchParams.toString()
    const query = search ? `?${search}` : ''

    router.replace(`${pathname}${query}`)
  }

  const updateParams = (params: BuilderManagerParameters) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))

    Object.entries(params).forEach(([key, value]) => {
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
    isEdit: resolvedMode === builderViews.edit,
    focus: searchParams.get(builderOptions.focus),
    isTextEditing: textEditing === '1',
    updateParams
  }
}
