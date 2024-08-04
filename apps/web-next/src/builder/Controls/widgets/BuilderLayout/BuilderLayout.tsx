'use client'
import { FC, useContext } from 'react'
import { useBuilderLayout } from './hooks/useBuilderLayout'
import TabsSelector from '@/app/components/TabsSelector'
import Select from '@/app/components/Select/Select'
import InputNumber from '@/app/components/InputNumber/InputNumber'
import Slider from '@/app/components/Slider/Slider'
import InputGroup from '@/app/components/InputGroup/InputGroup'
import { builderLayerMode, builderNodes } from '@fragments/fragments-plugin/performance'
import Panel from '@/builder/components/Panel/Panel'
import PanelHeadAside from '@/builder/components/PanelHeadAside/PanelHeadAside'
import ControlRow from '@/builder/components/ControlRow/ControlRow'
import ControlRowWide from '@/builder/components/ControlRow/components/ControlRowWide/ControlRowWide'
import { BuilderContext } from '@/builder/BuilderContext'
import { animated, to } from '@react-spring/web'
import { BuilderLayoutPaddings } from '@/builder/Controls/widgets/BuilderLayout/components/BuilderLayoutPaddings/BuilderLayoutPaddings'
import { AnimatedVisible } from '@/app/components/AnimatedVisible/AnimatedVisible'

interface BuilderLayoutProps {
  className?: string
}

const BuilderLayout: FC<BuilderLayoutProps> = ({ className }) => {
  const { selectionGraph, direction, mode, align, wrap, distribute, gap, padding } = useBuilderLayout()
  const enabled = to(mode.value, mode => mode === builderLayerMode.flex)

  return (
    <Panel
      className={className}
      title='Layout'
      hasBody={enabled}
      aside={<PanelHeadAside isOpen={enabled} onClick={mode.onChange} />}
    >
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
        <InputNumber value={padding.value} empty={padding.isMixed} onChange={padding.onChange} />
        <TabsSelector items={padding.items} value={padding.mode} onChange={({ name }) => padding.onChangeMode(name)} />
      </ControlRow>
      <AnimatedVisible visible={padding.isMixed}>
        <BuilderLayoutPaddings
          values={padding.sidesInvoker.value}
          focusSide={padding.setPaddingSide}
          onChange={(side, value) => padding.sidesInvoker.onChange({ side, value })}
        />
      </AnimatedVisible>
    </Panel>
  )
}

export default BuilderLayout
