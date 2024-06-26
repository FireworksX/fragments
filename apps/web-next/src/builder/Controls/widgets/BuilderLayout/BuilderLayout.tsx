'use client'
import { FC, useContext } from 'react'
import { useBuilderLayout } from './hooks/useBuilderLayout'
import TabsSelector from '@/app/components/TabsSelector'
import Select from '@/app/components/Select/Select'
import InputNumber from '@/app/components/InputNumber/InputNumber'
import Slider from '@/app/components/Slider/Slider'
import InputGroup from '@/app/components/InputGroup/InputGroup'
import { builderLayerMode, builderNodes } from '@fragments/fragments-plugin'
import Panel from '@/builder/components/Panel/Panel'
import PanelHeadAside from '@/builder/components/PanelHeadAside/PanelHeadAside'
import ControlRow from '@/builder/components/ControlRow/ControlRow'
import ControlRowWide from '@/builder/components/ControlRow/components/ControlRowWide/ControlRowWide'
import { BuilderContext } from '@/builder/BuilderContext'

interface BuilderLayoutProps {
  className?: string
}

const BuilderLayout: FC<BuilderLayoutProps> = ({ className }) => {
  const { selectionGraph, direction, mode, align, wrap, distribute, gap, padding } = useBuilderLayout()
  const enabled = mode.value === builderLayerMode.flex

  if (
    ![builderNodes.Frame, builderNodes.Screen, builderNodes.ComponentVariant].some(
      type => type === selectionGraph?._type
    )
  ) {
    return null
  }

  return (
    <Panel className={className} title='Layout' aside={<PanelHeadAside isOpen={enabled} onClick={mode.onChange} />}>
      {enabled && (
        <>
          <ControlRow title='Direction' actions={direction.actions} isHighlight={direction.isOverride}>
            <ControlRowWide>
              <TabsSelector
                items={direction.items}
                value={direction.value}
                onChange={({ name }) => direction.onChange(name)}
              />
            </ControlRowWide>
          </ControlRow>

          <ControlRow title='Align' actions={align.actions} isHighlight={align.isOverride}>
            <ControlRowWide>
              <TabsSelector items={align.items} value={align.value} onChange={({ name }) => align.onChange(name)} />
            </ControlRowWide>
          </ControlRow>

          <ControlRow title='Distribute' actions={distribute.actions} isHighlight={distribute.isOverride}>
            <ControlRowWide>
              <Select value={distribute.value} onChange={distribute.onChange}>
                {distribute.items.map(el => (
                  <option key={el} value={el}>
                    {el}
                  </option>
                ))}
              </Select>
            </ControlRowWide>
          </ControlRow>

          <ControlRow title='Wrap' actions={wrap.actions} isHighlight={wrap.isOverride}>
            <ControlRowWide>
              <TabsSelector items={wrap.items} value={wrap.value} onChange={({ name }) => wrap.onChange(name)} />
            </ControlRowWide>
          </ControlRow>

          <ControlRow title='Gap' actions={gap.actions} isHighlight={gap.isOverride}>
            <InputNumber value={gap.value} max={100} onChange={gap.onChange} />
            <Slider value={gap.value} max={100} onChange={gap.onChange} />
          </ControlRow>

          <ControlRow title='Padding' actions={padding.actions} isHighlight={padding.isOverride}>
            <InputNumber value={padding.value} onChange={padding.onChange} />
            <TabsSelector
              items={padding.items}
              value={padding.mode}
              onChange={({ name }) => padding.onChangeMode(name)}
            />
          </ControlRow>
          {padding.mode === 'sides' && (
            <ControlRow>
              <ControlRowWide>
                <InputGroup>
                  <InputNumber
                    value={padding.paddingSide.value.paddingTop}
                    withoutTicker={true}
                    onChange={value => padding.paddingSide.onChange({ side: 'top', value })}
                    onFocus={() => padding.setPaddingSide('top')}
                    onBlur={() => padding.setPaddingSide(undefined)}
                  />
                  <InputNumber
                    value={padding.paddingSide.value.paddingRight}
                    withoutTicker={true}
                    onChange={value => padding.paddingSide.onChange({ side: 'right', value })}
                    onFocus={() => padding.setPaddingSide('right')}
                    onBlur={() => padding.setPaddingSide(undefined)}
                  />
                  <InputNumber
                    value={padding.paddingSide.value.paddingBottom}
                    withoutTicker={true}
                    onChange={value => padding.paddingSide.onChange({ side: 'bottom', value })}
                    onFocus={() => padding.setPaddingSide('bottom')}
                    onBlur={() => padding.setPaddingSide(undefined)}
                  />
                  <InputNumber
                    value={padding.paddingSide.value.paddingLeft}
                    withoutTicker={true}
                    onChange={value => padding.paddingSide.onChange({ side: 'left', value })}
                    onFocus={() => padding.setPaddingSide('left')}
                    onBlur={() => padding.setPaddingSide(undefined)}
                  />
                </InputGroup>
              </ControlRowWide>
            </ControlRow>
          )}
        </>
      )}
    </Panel>
  )
}

export default BuilderLayout
