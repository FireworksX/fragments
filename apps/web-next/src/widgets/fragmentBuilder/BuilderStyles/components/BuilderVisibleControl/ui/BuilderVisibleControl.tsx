import { FC, memo } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputNumber } from '@/shared/ui/InputNumber'
import { Slider } from '@/shared/ui/Slider'
import { booleanTabsSelectorItems } from '@/shared/data'
import { TabsSelector } from '@/shared/ui/TabsSelector'
import { useLayerVariables } from '../../../../../../shared/hooks/fragmentBuilder/useLayerVariable'
import { useLayerPropertyValue } from '@/shared/hooks/fragmentBuilder/useLayerPropertyVariable'

interface BuilderVisibleControlProps {
  className?: string
}

export const BuilderVisibleControl: FC<BuilderVisibleControlProps> = memo(({ className }) => {
  const [value, setValue, valueInfo] = useLayerValue('visible')
  const { disabled, actions, variableLink, resetVariable, editVariable } = useLayerPropertyValue('visible')

  return (
    <ControlRow
      className={className}
      title='Visible'
      value={value}
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
        <TabsSelector items={booleanTabsSelectorItems} value={value} onChange={({ name }) => setValue(name)} />
      </ControlRowWide>
    </ControlRow>
  )
})
