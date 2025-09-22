import { FC, useContext, useEffect, useMemo, useState } from 'react'
import { isObject, objectToColorString, omit } from '@fragmentsx/utils'
import { isLinkKey } from '@graph-state/core'
import { definition } from '@fragmentsx/definition'
import { useDisplayColor } from '@/shared/hooks/fragmentBuilder/useDisplayColor'
import { animatableValue } from '@/shared/utils/animatableValue'
import { Panel } from '@/shared/ui/Panel'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputSelect } from '@/shared/ui/InputSelect'
import { InputNumber } from '@/shared/ui/InputNumber'
import { Stepper } from '@/shared/ui/Stepper'
import { Select } from '@/shared/ui/Select'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { getRandomColor } from '@/shared/utils/random'
import { popoutNames } from '@/shared/data'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { fromPx } from '@/shared/utils/fromPx'
import { TabsSelector } from '@/shared/ui/TabsSelector'
import Rectangle from '@/shared/icons/rectangle.svg'
import { BoxSizingSides } from '@/shared/ui/BoxSizingSides'
import { toPx } from '@/shared/utils/toPx'
import { BuilderSidesInput } from '@/features/fragmentBuilder/BuilderSidesInput'
import { useStack } from '@/shared/hooks/useStack'
import { useLayerPropertyValue } from '@/shared/hooks/fragmentBuilder/useLayerPropertyVariable'

export interface StackPanelBorderOptions {
  value?: BorderData
  onChange: (border: BorderData) => void
}

interface StackPanelBorderProps extends StackPanel {
  className?: string
}

const StackPanelBorder: FC<StackPanelBorderProps> = ({ className }) => {
  const stack = useStack()
  const [borderType, setBorderType] = useLayerValue('borderType')
  const [borderColor, setBorderColor] = useLayerValue('borderColor')
  const [borderWidth, setBorderWidth] = useLayerValue('borderWidth')

  const borderColorVariable = useLayerPropertyValue('borderColor', {
    editVariable: options => (options.isProjectVariable ? openColor() : options.editVariable())
  })

  console.log(borderColorVariable)

  const resultWidth = fromPx(borderWidth)
  const sides = borderWidth?.split(' ')?.map(fromPx)
  const initialMode = sides?.length > 1 ? 'sides' : 'plain'

  const [mode, setMode] = useState(initialMode)
  const [side, setSide] = useState<number | undefined>()

  const openColor = () => {
    stack.open(popoutNames.colorPicker, {
      value: borderColor,
      onChange: nextColor => {
        setBorderColor(objectToColorString(nextColor))
      }
    })
  }

  const sideByIndex = useMemo(() => {
    if (side === 0) return 'top'
    if (side === 1) return 'right'
    if (side === 2) return 'bottom'
    if (side === 3) return 'left'
  }, [side])

  const selectMode = mode => {
    if (mode === 'sides') {
      const value = borderWidth ?? '0px'
      setBorderWidth([value, value, value, value].join(' '))
    } else {
      const value = borderWidth?.split(' ')?.at(0) ?? '0px'
      setBorderWidth(value)
    }

    setMode(mode)
  }

  const setSideValue = (sideIndex, value) => {
    sides[sideIndex] = value
    setBorderWidth(sides.map(toPx).join(' '))
  }

  useEffect(() => {
    if (borderType === definition.borderType.None) {
      setBorderType(definition.borderType.Solid)
    }
  }, [])

  return (
    <Panel className={className}>
      <ControlRow
        title='Color'
        variable={{
          data: borderColorVariable?.variableData,
          actions: borderColorVariable?.actions,
          onClick: borderColorVariable?.editVariable,
          onReset: borderColorVariable?.resetVariable
        }}
      >
        <ControlRowWide>
          <InputSelect color={borderColor} onClick={openColor}>
            {borderColor}
          </InputSelect>
        </ControlRowWide>
      </ControlRow>

      <ControlRow title='Width'>
        <InputNumber
          value={resultWidth}
          disabled={mode === 'sides'}
          empty={mode === 'sides'}
          min={0}
          onChange={width => setBorderWidth(toPx(width))}
        />
        <TabsSelector
          items={[
            {
              name: 'plain',
              label: <Rectangle width={10} height={10} />
            },
            {
              name: 'sides',
              label: <BoxSizingSides side={sideByIndex} />
            }
          ]}
          value={mode}
          onChange={({ name }) => selectMode(name)}
        />
      </ControlRow>
      {mode === 'sides' && (
        <BuilderSidesInput values={sides} focusSide={setSide} onChange={(side, value) => setSideValue(side, value)} />
      )}

      <ControlRow title='Style'>
        <ControlRowWide>
          <Select value={borderType} onChange={type => setBorderType(type)}>
            {Object.keys(omit(definition.borderType, definition.borderType.None)).map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </ControlRowWide>
      </ControlRow>
    </Panel>
  )
}

export default StackPanelBorder
