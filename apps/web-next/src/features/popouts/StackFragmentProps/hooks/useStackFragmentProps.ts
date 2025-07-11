import { useFragmentManager, useFragmentProperties } from '@fragmentsx/render-suite'
import { popoutsStore } from '@/shared/store/popouts.store'
import { popoutNames } from '@/shared/data'
import { isObject, omit } from '@fragmentsx/utils'

interface Options {
  fragmentId: number
  props: Record<string, unknown>
  onChange?: (nextProps: Record<string, unknown>) => void
}

export const useStackFragmentProps = (options: Options) => {
  const { properties: fragmentDefinition } = useFragmentProperties(options.fragmentId)
  const { manager: fragmentManager } = useFragmentManager(options.fragmentId)

  const handleChangeValue = (id, value) => {
    const nextProps = omit({ ...options.props, [id]: value }, '_type', '_id')

    options.onChange(nextProps)
    popoutsStore.updateContext(popoutNames.stackFragmentProps, {
      ...options,
      props: nextProps
    })
  }

  return {
    definitions: fragmentDefinition.map(definition => {
      const { _id, defaultValue } = fragmentManager?.resolve?.(definition) ?? {}

      return {
        link: definition,
        value: isObject(options.props) && _id in options.props ? options?.props[_id] : defaultValue,
        setValue: value => handleChangeValue(_id, value)
      }
    }),
    manager: fragmentManager
  }
}
