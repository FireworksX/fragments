import { clonedField, Resolver } from '../helpers'
import { keyOfEntity } from '@adstore/statex'
import { EntityKey } from '@adstore/web/src/types/props'

export const cssPropsResolver: Resolver = (statex, entity) => {
  const key = keyOfEntity(entity)

  return {
    ...entity,
    cssText: clonedField(statex, entity, 'cssText'),
    cssLinks: clonedField(statex, entity, 'cssLinks', []),
    setCssText(cssText: string) {
      statex.mutate(key, {
        cssText
      })
    },
    setCssLinks(cssLinks: EntityKey[]) {
      statex.mutate(
        key,
        {
          cssLinks: cssLinks
        },
        { replace: true }
      )
    },
    addCssLink(cssLink: EntityKey) {
      statex.mutate(key, {
        cssLinks: [cssLink]
      })
    },
    detachCssLink(cssLink: EntityKey) {
      statex.mutate(
        key,
        prev => ({
          cssLinks: prev.cssLinks.filter(l => l !== cssLink)
        }),
        { replace: true }
      )
    }
  }
}
