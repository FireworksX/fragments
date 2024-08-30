import { FC, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import ControlRow from '@/builder/components/ControlRow/ControlRow'
import ControlRowWide from '@/builder/components/ControlRow/components/ControlRowWide/ControlRowWide'
import Select from '@/app/components/Select/Select'
import { LinkKey } from '@graph-state/core'
import { BuilderContext } from '@/builder/BuilderContext'
import { useGraph } from '@graph-state/react'
import { builderVariableTransforms, builderVariableType } from '@fragments/fragments-plugin'
import { useBuilderVariableTransforms } from '@/builder/hooks/useBuilderVariableTransforms'
import InputNumber from '@/app/components/InputNumber/InputNumber'
import { TransformNumberValue } from './components/TransformNumberValue/TransformNumberValue'
import { TransformConvertFromBooleanValue } from '@/builder/StackCollector/components/variables/StackVariableTransform/components/StackTransformSection/components/TransformConvertFromBooleanValue/TransformConvertFromBooleanValue'
import Panel from '@/builder/components/Panel/Panel'
import { TransformBooleanValue } from '@/builder/StackCollector/components/variables/StackVariableTransform/components/StackTransformSection/components/TransformBooleanValue/TransformBooleanValue'

interface StackTransformSectionProps {
  className?: string
  transformLink: LinkKey
  inputType: keyof typeof builderVariableType
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
  const { documentManager } = useContext(BuilderContext)
  const [transform] = useGraph(documentManager, transformLink)
  const { getTransformsByType } = useBuilderVariableTransforms()
  const allTransforms = getTransformsByType(inputType)
  const withoutReplace = transform.name === builderVariableTransforms.convertFromBoolean

  const Control =
    transform.name === builderVariableTransforms.convertFromBoolean ? (
      <TransformConvertFromBooleanValue {...transform} valueReferenceOptions={valueReferenceOptions} />
    ) : (
      {
        [builderVariableType.Number]: <TransformNumberValue value={transform.value} />,
        [builderVariableType.Boolean]: <TransformBooleanValue value={transform.value} />
      }[inputType]
    )

  console.log(transform, inputType, Control)

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
