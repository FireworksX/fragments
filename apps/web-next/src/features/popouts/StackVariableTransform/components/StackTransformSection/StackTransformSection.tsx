import { FC, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { LinkKey } from '@graph-state/core'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { TransformNumberValue } from './components/TransformNumberValue/TransformNumberValue'
// import { TransformBooleanValue } from '@/builder/StackCollector/components/variables/StackVariableTransform/components/StackTransformSection/components/TransformBooleanValue/TransformBooleanValue'
import { useFragmentComputedValues } from '@/shared/hooks/fragmentBuilder/useFragmentComputedValues'
import { TransformConvertFromBooleanValue } from '@/features/popouts/StackVariableTransform/components/StackTransformSection/components/TransformConvertFromBooleanValue/TransformConvertFromBooleanValue'
import { Panel } from '@/shared/ui/Panel'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { Select } from '@/shared/ui/Select'
import { definition } from '@fragmentsx/definition'
import { TransformBooleanValue } from './components/TransformBooleanValue/TransformBooleanValue'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'

interface StackTransformSectionProps {
  className?: string
  transformLink: LinkKey
  inputType: keyof typeof definition.variableType
  isFirst?: boolean
  valueReferenceOptions: unknown
}

export const StackTransformSection: FC<StackTransformSectionProps> = ({
  className,
  isFirst,
  transformLink,
  inputType,
  valueReferenceOptions = {}
}) => {
  const { documentManager } = useBuilderDocument()
  const [transform] = useGraph(documentManager, transformLink)
  const { getTransformsByType } = useFragmentComputedValues()
  const allTransforms = getTransformsByType(inputType)
  const withoutReplace = transform.name === definition.variableTransforms.convertFromBoolean

  const Control =
    transform.name === definition.variableTransforms.convertFromBoolean ? (
      <TransformConvertFromBooleanValue {...transform} valueReferenceOptions={valueReferenceOptions} />
    ) : (
      {
        [definition.variableType.Number]: (
          <TransformNumberValue value={transform.value} onChange={transform.setValue} />
        ),
        [definition.variableType.Boolean]: (
          <TransformBooleanValue value={transform.value} onChange={transform.setValue} />
        )
      }[inputType]
    )

  return (
    <Panel
      className={cn(styles.root, className, { [styles.withPaddingTop]: !isFirst })}
      data-testid='StackTransformSection'
    >
      {!withoutReplace && (
        <ControlRow title='Type'>
          <ControlRowWide>
            <Select
              value={transform.name}
              onChange={value => {
                console.log(value)
              }}
            >
              {allTransforms.map(otherTransform => (
                <option key={otherTransform.type} value={otherTransform.key}>
                  {otherTransform.label}
                </option>
              ))}
            </Select>
          </ControlRowWide>
        </ControlRow>
      )}
      {Control}
    </Panel>
  )
}
