import { useStore } from '@nanostores/react'
import { $builderView, $layers, $statex } from '../../../../store/builderRouterStore'
import { useStatex } from '@adstore/statex-react'
import { useState } from 'react'
import { ComponentProperty } from '../../../../types/componentProperties'

export const useComponentVariablesModal = () => {
  const builderView = useStore($builderView)
  const statex = useStore($statex)
  const { openLayerField } = useStore($layers)
  const [active, setActive] = useState<string | undefined>()
  const componentNode = useStatex(statex, builderView === 'component' ? openLayerField : '')
  const activeProperty = useStatex(statex, active)
  const definitions = componentNode?.componentPropertyDefinitions ?? []

  const onChange = (nextProperty: ComponentProperty) => componentNode.editComponentProperty(nextProperty)

  return {
    activeProperty,
    active,
    definitions,
    select: setActive,
    onChange
  }
}
