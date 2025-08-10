import { useFragmentManager, useFragmentProperties } from '@fragmentsx/render-suite'
import { popoutsStore } from '@/shared/store/popouts.store'
import { popoutNames } from '@/shared/data'
import { isObject, omit } from '@fragmentsx/utils'
import { useMemo } from 'react'
import { keyOfEntity } from '@graph-state/core'
import { isVariableLink } from '@/shared/utils/isVariableLink'

interface Options {
  fragmentId: number
  props: Record<string, unknown>
  areaProperties: unknown
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

  const definitions = useMemo(() => {
    return fragmentDefinition.map(definition => {
      const resolvedDefinition = fragmentManager?.resolve?.(definition) ?? {}
      const allowProps = options.areaProperties?.filter?.(prop => prop?.type === resolvedDefinition.type)
      let actions = []

      if (allowProps?.length) {
        actions = [
          {
            name: 'setVariable',
            label: 'Set variable',
            options: [
              allowProps.map(prop => ({
                label: prop?.name,
                name: prop?.name,
                onClick: () => {
                  handleChangeValue(resolvedDefinition._id, keyOfEntity(prop))
                  // proxySetFieldValue?.(documentManager.keyOfEntity(prop))
                }
              }))
            ]
          }
        ]
      }

      const value =
        isObject(options.props) && resolvedDefinition._id in options.props
          ? options?.props[resolvedDefinition._id]
          : resolvedDefinition.defaultValue

      return {
        link: definition,
        value,
        variable: {
          actions,
          data: isVariableLink(keyOfEntity(value)) ? value : null
        },
        hasConnector: !!actions?.length,
        setValue: value => handleChangeValue(resolvedDefinition._id, value)
      }
    })
  }, [fragmentDefinition, fragmentManager, handleChangeValue, options.areaProperties, options.props])

  return {
    definitions,
    manager: fragmentManager
  }
}
