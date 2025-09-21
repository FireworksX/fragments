import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { isValue } from '@fragmentsx/utils'

type OptionalType = 'minWidth' | 'minHeight' | 'maxWidth' | 'maxHeight'

export const useBuilderSizeOptionals = (type: OptionalType, label: string) => {
  const [value, , { setWithAutoPatch: setValue, ...valueInfo }] = useLayerValue(type)
  const [valueType, setValueType, valueTypeInfo] = useLayerValue(`${type}Type`)

  const enable = () => {
    setValue(100)
  }

  const disable = () => {
    setValue(-1)
  }

  return {
    label,
    enabled: isValue(value) && value > -1,
    value,
    setValue,
    valueInfo,
    valueType,
    setValueType,
    valueTypeInfo,
    enable,
    disable
  }
}
