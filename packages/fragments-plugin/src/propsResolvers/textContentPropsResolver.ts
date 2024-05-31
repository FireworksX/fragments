import { clonedField, Resolver } from '../helpers'

export const textContentPropsResolver: Resolver = (statex, entity) => {
  const key = statex.keyOfEntity(entity)

  return {
    ...entity,
    content: clonedField(statex, entity, 'content', [
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
      statex.mutate(
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
