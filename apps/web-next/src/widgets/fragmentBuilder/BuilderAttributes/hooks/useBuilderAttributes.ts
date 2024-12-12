import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'

export const useBuilderAttributes = () => {
  const { selectionGraph } = useBuilderSelection()
  const attributes = Object.fromEntries(
    Object.entries(selectionGraph?.attributes ?? {}).filter(([key]) => key !== '_type' && key !== '_id')
  )

  return {
    disabled: !('setAttribute' in (selectionGraph ?? {})),
    attributes,
    setAttribute: selectionGraph?.setAttribute,
    removeAttribute: selectionGraph?.removeAttribute
  }
}
