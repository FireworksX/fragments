import { useStore } from '@nanostores/react'
import { useStatex, useStatexStack } from '@adstore/statex-react'
import { $layers, $primaryVariantOfComponent, $statex } from 'src/store/builderRouterStore'
import { useMemo } from 'react'
import { omit, pick } from '@adstore/utils'
import { createComponentVariant } from '../../../data/promos/creators'
import { keyOfEntity } from '@adstore/statex'

/*
Контролирует выбранный компонент
 */

export const useComponentVariants = () => {
  const statex = useStore($statex)
  const { activeComponentField, activeLayerField, rootLayerField } = useStore($layers)
  const primaryVariant = useStore($primaryVariantOfComponent)
  const componentValue = useStatex(statex, activeComponentField || activeLayerField)
  const variantsKeys = useMemo(() => componentValue?.children ?? [], [componentValue])
  const variantsValues = useStatexStack(statex, variantsKeys)

  const addVariant = () => {
    statex.mutate({
      ...pick(componentValue, '_type', '_id'),
      children: [
        createComponentVariant({
          ...omit(primaryVariant, '_id', 'isPrimary'),
          label: `Variant ${variantsKeys.length + 1}`
        })
      ]
    })
  }

  return {
    variantsKeys,
    variantsValues,
    componentKey: activeComponentField,
    componentValue,
    currentKey: rootLayerField,
    primaryKey: keyOfEntity(primaryVariant),
    primaryVariantValue: primaryVariant,
    addVariant
  }
}
