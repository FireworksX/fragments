import { useStore } from '@nanostores/react'
import { useLayerInvoker } from 'src/hooks/useLayerInvoker'
import { $statex } from 'src/store/builderRouterStore'
import { useStatex, useStatexStack } from '@adstore/statex-react'
import { useBuilderSelection } from '../../../../../../../hooks/useBuilderSelection'
import { EntityKey } from '../../../../../../../types/props'
import { useBuilderAssetsComponents } from '@/app/builder/widgets/Builder/widgets/Assets/hooks/useBuilderAssetsComponents'
import { keyOfEntity } from '@adstore/statex'

export const useBuilderComponent = () => {
  const statex = useStore($statex)
  const { open } = useBuilderAssetsComponents()
  const { selection } = useBuilderSelection()
  const instanceValue = useStatex(statex, selection)
  const mainComponent = useStatex(statex, instanceValue.mainComponent.slice(1))
  const variantsValues = useStatexStack(statex, mainComponent?.children ?? [])
  const layerInvoker = useLayerInvoker(selection)

  return {
    label: mainComponent?.name,
    handleEdit: () => open(keyOfEntity(mainComponent)),
    variants: {
      list: variantsValues,
      value: instanceValue?.variant,
      onChange: (variantKey: EntityKey) => {
        instanceValue.setVariant(variantKey)
        // statex.mutate({ ...componentValue, variant })
      }
    }
  }
}
