import { FC, memo } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { TabsSelector } from '@/shared/ui/TabsSelector'
import { booleanTabsSelectorItems } from '@/shared/data'
import { InputSelect } from '@/shared/ui/InputSelect'
import { paintMode } from '@fragments/plugin-fragment'
import { popoutsStore } from '@/shared/store/popouts.store'
import { useLayerVariables } from '@/shared/hooks/fragmentBuilder/useLayerVariables'

interface BuilderFillControlProps {
  className?: string
}

const ALLOW_FILL_TYPES = [paintMode.Solid]

export const BuilderFillControl: FC<BuilderFillControlProps> = memo(({ className }) => {
  const [fillType, setFillType] = useLayerValue('fillType')
  const [value, setValue, valueInfo] = useLayerValue('solidFill')
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
          color={value}
          onReset={() => setFillType(paintMode.None)}
          onClick={openFill}
        >
          {fillType && ALLOW_FILL_TYPES.includes(fillType) ? value : fillType === paintMode.Image ? 'Image' : ''}
        </InputSelect>
      </ControlRowWide>
    </ControlRow>
  )
})
