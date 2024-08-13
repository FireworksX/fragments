import { clonedField, Resolver } from 'src/utils/cloneField/cloneField.performance'

export const textContentProps: Resolver = (state, entity) => {
  const key = state.keyOfEntity(entity)

  return {
    ...entity,
    content: clonedField(state, entity, 'content', '', false),
    setContent(content: string) {
      state.mutate(key, {
        content
      })
    },
    insertCharacters(start: number, characters: string) {}
  }
}
