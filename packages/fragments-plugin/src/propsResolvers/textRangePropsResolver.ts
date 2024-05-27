import { clonedField, Resolver } from '../helpers'
import { keyOfEntity } from '@adstore/statex'
import { builderTextDecorations, builderTextTransform } from '../defenitions'

export const textRangePropsResolver: Resolver = (statex, entity) => {
  const key = keyOfEntity(entity)

  return {
    ...entity,
    fill: clonedField(statex, entity, 'fill'),
    fontSize: clonedField(statex, entity, 'fontSize', 14),
    fontName: clonedField(statex, entity, 'fontName', 'Inter'),
    fontWeight: clonedField(statex, entity, 'fontWeight', 400),
    textTransform: clonedField(statex, entity, 'textTransform', builderTextTransform.none),
    textDecoration: clonedField(statex, entity, 'textDecoration', builderTextDecorations.none),
    letterSpacing: clonedField(statex, entity, 'letterSpacing'),
    lineHeight: clonedField(statex, entity, 'lineHeight', 1.4)
  }
}
