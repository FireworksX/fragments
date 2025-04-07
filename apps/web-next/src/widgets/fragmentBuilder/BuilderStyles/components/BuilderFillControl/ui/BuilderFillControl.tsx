import { FC, memo } from 'react'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputSelect } from '@/shared/ui/InputSelect'
import { definition } from '@fragmentsx/definition'
import { popoutsStore } from '@/shared/store/popouts.store'
import { useLayerVariables } from '@/shared/hooks/fragmentBuilder/useLayerVariables'

interface BuilderFillControlProps {
  className?: string
}

const ALLOW_FILL_TYPES = [definition.paintMode.Solid]

export const BuilderFillControl: FC<BuilderFillControlProps> = memo(({ className }) => {
  const [fillType, setFillType] = useLayerValue('fillType')
  const [value, , valueInfo] = useLayerValue('solidFill')
  const { disabled, actions, editVariable, variableLink, resetVariable } = useLayerVariables('solidFill')

  const openFill = () => {
    popoutsStore.open('fill', {
      initial: true
    })
  }

  return (
    <ControlRow
      className={className}
      title='Fill'
      hasConnector={!disabled}
      override={{
        isOverride: valueInfo.isOverride,
        onRestOverride: valueInfo.resetOverride
      }}
      variable={{
        link: variableLink,
        actions,
        onClick: editVariable,
        onReset: resetVariable
      }}
    >
      <ControlRowWide>
        <InputSelect
          hasIcon={!!value && ALLOW_FILL_TYPES.includes(fillType)}
          color={valueInfo.value$}
          onReset={() => setFillType(definition.paintMode.None)}
          onClick={openFill}
        >
          {fillType && ALLOW_FILL_TYPES.includes(fillType)
            ? valueInfo.value$
            : fillType === definition.paintMode.Image
            ? 'Image'
            : ''}
        </InputSelect>
      </ControlRowWide>
    </ControlRow>
  )
})
