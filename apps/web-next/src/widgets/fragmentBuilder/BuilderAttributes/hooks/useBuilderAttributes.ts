import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'

export const useBuilderAttributes = () => {
  // const { selectionGraph } = useBuilderSelection()
  const attributes = Object.fromEntries(
    Object.entries({}?.attributes ?? {}).filter(([key]) => key !== '_type' && key !== '_id')
  )

  return {
    disabled: !('setAttribute' in ({} ?? {})),
    attributes,
    setAttribute: () => undefined, //selectionGraph?.setAttribute,
    removeAttribute: () => undefined //selectionGraph?.removeAttribute
  }
}
