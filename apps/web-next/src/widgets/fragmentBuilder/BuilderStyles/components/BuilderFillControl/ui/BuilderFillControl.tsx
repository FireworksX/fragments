import { FC, memo, useMemo } from 'react'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputSelect } from '@/shared/ui/InputSelect'
import { definition } from '@fragmentsx/definition'
import Image from 'next/image'
import { useLayerPropertyValue } from '@/shared/hooks/fragmentBuilder/useLayerPropertyVariable'
import { useCombinePropertyVariables } from '@/shared/hooks/fragmentBuilder/useCombinePropertyVariables'
import { useStack } from '@/shared/hooks/useStack'
import { popoutNames } from '@/shared/data'

interface BuilderFillControlProps {
  className?: string
}

export const ALLOW_FILL_TYPES = [definition.paintMode.Solid]
export const TYPES_WITH_ICON = [definition.paintMode.Solid, definition.paintMode.Image]

export const BuilderFillControl: FC<BuilderFillControlProps> = memo(({ className }) => {
  const { open: openStack } = useStack()
  const [fillType, setFillType] = useLayerValue('fillType')
  const [solidValue, , solidValueInfo] = useLayerValue('solidFill')
  const [imageValue, , imageValueInfo] = useLayerValue('imageFill')
  const solidFillVariable = useLayerPropertyValue('solidFill', {
    skipUseDefaultValue: fillType !== definition.paintMode.Solid,
    editVariable: options => (options.isProjectVariable ? openFill() : options.editVariable()),
    onSetValue: () => setFillType(definition.paintMode.Solid),
    onResetVariable: () => setFillType(definition.paintMode.None)
  })
  const imageFillVariable = useLayerPropertyValue('imageFill', {
    skipUseDefaultValue: fillType !== definition.paintMode.Image,
    onSetValue: () => setFillType(definition.paintMode.Image),
    onResetVariable: () => setFillType(definition.paintMode.None)
  })
  const resultVariable = useCombinePropertyVariables(
    [imageFillVariable, solidFillVariable],
    fillType === definition.paintMode.Image ? 0 : 1
  )

  const result = useMemo(() => {
    if (fillType === definition.paintMode.Solid) {
      return {
        value: solidValueInfo?.resultValue
      }
    }
    if (fillType === definition.paintMode.Image) {
      return {
        value: imageValue
      }
    }
  }, [fillType, imageValue, solidValueInfo?.resultValue])

  const openFill = () => {
    openStack(popoutNames.fill, {}, { initial: true })
  }

  return (
    <ControlRow
      className={className}
      title='Fill'
      hasConnector={!resultVariable?.disabled}
      override={{
        isOverride: solidValue?.isOverride,
        onRestOverride: solidValue?.resetOverride
      }}
      variable={{
        data: resultVariable?.variableData,
        actions: resultVariable?.actions,
        onClick: resultVariable?.editVariable,
        onReset: resultVariable?.resetVariable
      }}
    >
      <ControlRowWide>
        <InputSelect
          hasIcon={TYPES_WITH_ICON.includes(fillType)}
          color={result?.value}
          icon={
            fillType === definition.paintMode.Image && !imageValueInfo.isVariable ? (
              <Image width={24} height={24} src={result?.value} alt={'Image fill'} />
            ) : undefined
          }
          onReset={() => setFillType(definition.paintMode.None)}
          onClick={openFill}
        >
          {fillType && ALLOW_FILL_TYPES.includes(fillType)
            ? result?.value
            : fillType === definition.paintMode.Image
            ? 'Image'
            : ''}
        </InputSelect>
      </ControlRowWide>
    </ControlRow>
  )
})
