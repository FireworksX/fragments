import { FC, useContext, useEffect } from 'react'
import { StackPanel } from '../../hooks/useStackCollector'
import InputSelect from '@/app/components/InputSelect/InputSelect'
import InputNumber from '@/app/components/InputNumber/InputNumber'
import Stepper from '@/app/components/Stepper/Stepper'
import Select from '@/app/components/Select/Select'
import { popoutsStore } from '@/app/store/popouts.store'
import { builderBorderType, getDefaultBorder } from '@fragments/fragments-plugin'
import { useLayerInvoker } from '@/builder/hooks/useLayerInvoker'
import { useBuilderSelection } from '@/builder/hooks/useBuilderSelection'
import { useDisplayColor } from '@/builder/hooks/useDisplayColor'
import Panel from '@/builder/components/Panel/Panel'
import ControlRow from '@/builder/components/ControlRow/ControlRow'
import ControlRowWide from '@/builder/components/ControlRow/components/ControlRowWide/ControlRowWide'
import { BuilderContext } from '@/builder/BuilderContext'
import { animated, to } from '@react-spring/web'
import { isObject, omit } from '@fragments/utils'
import { isLinkKey } from '@graph-state/core'

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
    if (borderTypeInvoker.value?.get() === builderBorderType.None) {
      borderTypeInvoker.onChange(builderBorderType.Solid)
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
            {Object.keys(omit(builderBorderType, builderBorderType.None)).map(type => (
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
