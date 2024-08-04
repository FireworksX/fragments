import { SolidPaint } from 'src/types/props'
import { builderPaintMode } from 'src/defenitions'
import { Resolver } from 'src/helpers'
import { SpringValue } from '@react-spring/web'
import { clonedField } from '../../utils/cloneField/cloneField.performance'
import { solidFillProps } from './solidFill/solidFill.performance'
import { imageFillProps } from './imageFill/imageFill.performance'

export const getDefaultSolidFill = (): SolidPaint => ({
  type: builderPaintMode.Solid,
  color: {
    r: new SpringValue(86),
    g: new SpringValue(196),
    b: new SpringValue(187)
  }
})

export const fillProps: Resolver = (state, entity: any) => {
  const entityKey = state.keyOfEntity(entity)

  const solidFill = solidFillProps(state, entity)
  const imageFill = imageFillProps(state, entity)

  return {
    ...entity,
    ...solidFill,
    ...imageFill,
    fillType: clonedField(state, entity, 'fillType'),
    setFillType(type: keyof typeof builderPaintMode) {
      const value$ = state.resolve(entityKey).fillType

      if (value$) {
        value$.set(type)
      } else {
        state.mutate(entityKey, {
          fillType: new SpringValue(type)
        })
      }
    }
  }
}
