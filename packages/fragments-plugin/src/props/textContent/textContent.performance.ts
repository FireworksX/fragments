import { clonedField, Resolver } from 'src/helpers'

export const textContentProps: Resolver = (state, entity) => {
  const key = state.keyOfEntity(entity)

  return {
    ...entity,
    content: clonedField(state, entity, 'content', [
      {
        type: 'paragraph',
        children: [
          {
            text: ''
          }
        ]
      }
    ]),
    setContent(content: string) {
      state.mutate(
        key,
        {
          content
        },
        { replace: true }
      )
    },
    insertCharacters(start: number, characters: string) {}
  }
}
