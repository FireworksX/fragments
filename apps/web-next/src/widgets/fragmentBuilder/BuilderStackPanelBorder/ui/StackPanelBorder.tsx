import { FC, useContext, useEffect } from 'react'
import { popoutsStore } from '@/shared/store/popouts.store'
import { isObject, omit } from '@fragments/utils'
import { isLinkKey } from '@graph-state/core'
import { borderType } from '@fragments/plugin-state'
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

export interface StackPanelBorderOptions {
  value?: BorderData
  onChange: (border: BorderData) => void
}

interface StackPanelBorderProps extends StackPanel {
  className?: string
}

const StackPanelBorder: FC<StackPanelBorderProps> = ({ className }) => {
  const { selection } = useBuilderSelection()
  const { getColor, getNameColor } = useDisplayColor()
  const layerInvoker = useLayerInvoker(selection, ({ node, documentManager, value, prevValue, key }) => {
    switch (key) {
      case 'borderType':
        node.setBorderType(value)
        break
      case 'borderWidth':
        node.setBorderWidth(value)
        break
      case 'borderColor':
        node.setBorderColor(value)

        if (isLinkKey(prevValue) && isObject(value)) {
          popoutsStore.updateCurrentContext({ value: documentManager.resolveValue(node, 'borderColor') })
        }
        break
    }
  })

  const borderTypeInvoker = layerInvoker('borderType')
  const borderWidthInvoker = layerInvoker('borderWidth')
  const borderColorInvoker = layerInvoker('borderColor')

  useEffect(() => {
    if (animatableValue(borderTypeInvoker.value) === borderType.None) {
      borderTypeInvoker.onChange(borderType.Solid)
    }
  }, [])

  return (
    <Panel className={className}>
      <ControlRow title='Color'>
        <ControlRowWide>
          <InputSelect
            color={getColor(borderColorInvoker.value)}
            onClick={() =>
              popoutsStore.open('colorPicker', {
                context: {
                  value: borderColorInvoker.value,
                  onChange: nextColor => borderColorInvoker.onChange(nextColor)
                }
              })
            }
          >
            {getNameColor(borderColorInvoker.value)}
          </InputSelect>
        </ControlRowWide>
      </ControlRow>

      <ControlRow title='Width'>
        <InputNumber
          value={borderWidthInvoker?.value}
          min={0}
          onChange={width => borderWidthInvoker.onChange(+width)}
        />
        <Stepper value={borderWidthInvoker?.value} min={0} onChange={width => borderWidthInvoker.onChange(+width)} />
      </ControlRow>

      <ControlRow title='Style'>
        <ControlRowWide>
          <Select value={borderTypeInvoker?.value} onChange={type => borderTypeInvoker.onChange(type)}>
            {Object.keys(omit(borderType, borderType.None)).map(type => (
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
