import { clonedField, Resolver } from '../helpers'
import { keyOfEntity } from '@adstore/statex'

export const hyperlinkPropsResolver: Resolver = (graphState, entity) => {
  const key = keyOfEntity(entity)

  return {
    ...entity,
    hyperlinkHref: clonedField(graphState, entity, 'hyperlinkHref'),
    hyperlinkNewTab: clonedField(graphState, entity, 'hyperlinkNewTab'),
    setHyperlinkHref(href: string) {
      graphState.mutate(key, {
        hyperlinkHref: href
      })
    },
    setHyperlinkNewTab(flag: boolean) {
      graphState.mutate(key, {
        hyperlinkNewTab: flag
      })
    }
  }
}
