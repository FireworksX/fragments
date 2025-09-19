import { useEffect, useMemo, useState } from 'react'
import { omit } from '@fragmentsx/utils'
import { isVariableLink } from '@/shared/utils/isVariableLink'
import { entityOfKey } from '@graph-state/core'
import { useProject } from '@/shared/hooks/useProject'

export const useFragmentPreviewSandbox = (
  initialProps: unknown = {},
  onChangeProps?: () => void,
  areaProperties?: unknown
) => {
  const { properties } = useProject()
  const projectProperties = properties.reduce((acc, prop) => {
    acc[prop._id] = prop.defaultValue
    return acc
  }, {})
  const [props, setProps] = useState(() => omit(initialProps, '_type', '_id'))

  const resultProps = useMemo(
    () =>
      Object.entries(props).reduce((acc, [key, value]) => {
        if (isVariableLink(value)) {
          const valueId = entityOfKey(value)?._id
          const areaValue = areaProperties?.find(el => valueId === el._id)?.defaultValue
          acc[key] = value
          acc[valueId] = areaValue
        } else {
          acc[key] = value
        }

        return acc
      }, projectProperties),
    [props]
  )

  useEffect(() => {
    onChangeProps?.(resultProps)
  }, [resultProps])

  return {
    props: resultProps,
    setProps
  }
}
