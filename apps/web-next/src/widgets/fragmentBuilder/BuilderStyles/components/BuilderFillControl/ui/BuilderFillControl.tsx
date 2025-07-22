import { FC, memo, useMemo } from 'react'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputSelect } from '@/shared/ui/InputSelect'
import { definition } from '@fragmentsx/definition'
import { popoutsStore } from '@/shared/store/popouts.store'
import Image from 'next/image'
import { useLayerPropertyValue } from '@/shared/hooks/fragmentBuilder/useLayerPropertyVariable'

interface BuilderFillControlProps {
  className?: string
}

export const ALLOW_FILL_TYPES = [definition.paintMode.Solid]
export const TYPES_WITH_ICON = [definition.paintMode.Solid, definition.paintMode.Image]

export const BuilderFillControl: FC<BuilderFillControlProps> = memo(({ className }) => {
  const [fillType, setFillType] = useLayerValue('fillType')
  const [solidValue, , solidValueInfo] = useLayerValue('solidFill')
  const [imageValue, , imageValueInfo] = useLayerValue('imageFill')
  const { disabled, actions, editVariable, variableLink, resetVariable } = useLayerPropertyValue('solidFill')

  const result = useMemo(() => {
    if (fillType === definition.paintMode.Solid) {
      return {
        value: solidValueInfo?.value$
      }
    }
    if (fillType === definition.paintMode.Image) {
      return {
        value: imageValue
      }
    }
  }, [fillType, imageValue, solidValueInfo?.value$])

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
        isOverride: solidValue?.isOverride,
        onRestOverride: solidValue?.resetOverride
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
          hasIcon={TYPES_WITH_ICON.includes(fillType)}
          color={result?.value}
          icon={
            fillType === definition.paintMode.Image ? (
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
