import { clonedField, Resolver } from '../helpers'

export const hyperlinkPropsResolver: Resolver = (state, entity) => {
  const key = state.keyOfEntity(entity)

  return {
    ...entity,
    hyperlinkHref: clonedField(state, entity, 'hyperlinkHref'),
    hyperlinkNewTab: clonedField(state, entity, 'hyperlinkNewTab', true),
    setHyperlinkHref(href: string) {
      state.mutate(key, {
        hyperlinkHref: href
      })
    },
    setHyperlinkNewTab(flag: boolean) {
      state.mutate(key, {
        hyperlinkNewTab: flag
      })
    }
  }
}
