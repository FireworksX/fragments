import { Resolver } from 'src/helpers'
import { clonedField } from 'src/utils/cloneField/cloneField.performance'
import { Entity, LinkKey } from '@graph-state/core'
import { SpringValue } from '@react-spring/web'

export const cssOverride: Resolver = (state, entity: any) => {
  const key = state.keyOfEntity(entity)

  return {
    ...entity,
    cssText: clonedField(state, entity, 'cssText', null),
    cssLinks: clonedField(state, entity, 'cssLinks', []),
    setCssText: cssText => {
      const value$ = state.resolve(key).cssText
      if (value$) {
        value$.set(cssText)
      } else {
        state.mutate(key, {
          cssText: new SpringValue(cssText)
        })
      }
      // state.mutate(key, {
      //   cssText: [variable]
      // })
    },
    addCssLink: (cssLink: LinkKey) => {
      state.mutate(key, {
        cssLinks: [cssLink]
      })
    },
    removeCssLink: (cssLink: LinkKey) => {
      state.mutate(key, prev => ({
        cssLinks: prev?.cssLinks?.filter(l => l !== cssLink)
      }))
    }
  }
}
