import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { InstancePropertyGenericProps } from '../../../components/InstancePropertyGeneric/ui/InstancePropertyGeneric'
import { InstancePropertyGeneric } from '../../../components/InstancePropertyGeneric'
import { useLayerScopes } from '@fragmentsx/render-core'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useLayerDefinitions } from '@/shared/hooks/fragmentBuilder/useLayerDefinitions'
import { GraphState, keyOfEntity } from '@graph-state/core'
import { useGraph } from '@graph-state/react'
import { fieldsConfig } from '@/shared/hooks/fragmentBuilder/useLayerPropertyVariable/fieldsConfig'
import { useLayerVariable } from '@/shared/hooks/fragmentBuilder/useLayerVariable'
import { useLayerPropertyValue } from '@/shared/hooks/fragmentBuilder/useLayerPropertyVariable'
import { isVariableLink } from '@/shared/utils/isVariableLink'
import { pick } from '@fragmentsx/utils'

interface InstancePropertyWithScopesProps extends InstancePropertyGenericProps {
  className?: string
  parentManager?: GraphState
}

export const InstancePropertyWithScopes: FC<InstancePropertyWithScopesProps> = ({
  className,
  property,
  manager,
  parentManager,
  value,
  onChange,
  ...restProps
}) => {
  const [propertyValue] = useGraph(manager, property)
  const [linkedVariableValue] = useGraph(isVariableLink(value) ? parentManager : null, value)
  const { selection } = useBuilderSelection()

  const propertyControl = useLayerPropertyValue(propertyValue?.nodePropertyControlReference, {
    value,
    onSetValue: onChange
  })

  const baseLayerVariale = useLayerVariable({
    layerKey: selection,
    preferredField: propertyValue,
    onSetValue: onChange
  })

  const resultActions = propertyValue?.nodePropertyControlReference
    ? propertyControl.actions
    : [baseLayerVariale.setVariableOption]

  return (
    <InstancePropertyGeneric
      {...restProps}
      property={property}
      manager={manager}
      value={value}
      hasConnector={!!resultActions?.length}
      actions={[resultActions]}
      variable={{
        data: linkedVariableValue
      }}
      onChange={onChange}
    />
  )
}
