import { FC, useContext } from 'react'
import styles from './styles.module.css'
import { useBuilderLayout } from '../hooks/useBuilderLayout'
import { Panel } from '@/shared/ui/Panel'
import { PanelHeadAside } from '@/shared/ui/PanelHeadAside'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { TabsSelector } from '@/shared/ui/TabsSelector'
import { Select } from '@/shared/ui/Select'
import { InputNumber } from '@/shared/ui/InputNumber'
import { AnimatedVisible } from '@/shared/ui/AnimatedVisible'
import { Slider } from '@/shared/ui/Slider'
import { BuilderLayoutPaddings } from '@/features/fragmentBuilder/BuilderLayoutPaddings'
import { layerMode } from '@fragments/plugin-fragment-spring'
import { animatableValue } from '@/shared/utils/animatableValue'
import { useInterpolation } from '@/shared/hooks/useInterpolation'

interface BuilderLayoutProps {
  className?: string
}

const BuilderLayout: FC<BuilderLayoutProps> = ({ className }) => {
  const { direction, mode, align, wrap, distribute, gap, padding } = useBuilderLayout()

  return (
    <Panel
      className={className}
      title='Layout'
      hasBody={mode.enabled}
      aside={<PanelHeadAside isOpen={mode.enabled} onClick={mode.toggle} />}
    >
      <ControlRow title='Direction'>
        <ControlRowWide>
          <TabsSelector
            items={direction.items}
            value={direction.value}
            onChange={({ name }) => direction.update(name)}
          />
        </ControlRowWide>
      </ControlRow>

      <ControlRow title='Align'>
        <ControlRowWide>
          <TabsSelector items={align.items} value={align.value} onChange={({ name }) => align.update(name)} />
        </ControlRowWide>
      </ControlRow>

      <ControlRow title='Distribute'>
        <ControlRowWide>
          <Select value={distribute.value} onChange={distribute.update}>
            {distribute.items.map(el => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </Select>
        </ControlRowWide>
      </ControlRow>

      <ControlRow title='Wrap'>
        <ControlRowWide>
          <TabsSelector items={wrap.items} value={wrap.value} onChange={({ name }) => wrap.update(name)} />
        </ControlRowWide>
      </ControlRow>

      <ControlRow title='Gap'>
        <InputNumber value={gap.value} max={100} onChange={gap.update} />
        <Slider value={gap.value} max={100} onChange={gap.update} />
      </ControlRow>

      <ControlRow title='Padding'>
        <InputNumber
          value={padding.value}
          disabled={padding.mode === 'sides'}
          empty={padding.mode === 'sides'}
          onChange={padding.update}
        />
        <TabsSelector
          cellClassName={styles.paddingCell}
          items={padding.items}
          value={padding.mode}
          onChange={({ name }) => padding.setMode(name)}
        />
      </ControlRow>
      {padding.mode === 'sides' && (
        <BuilderLayoutPaddings
          values={padding.sidesValues}
          focusSide={padding.setPaddingSide}
          onChange={(side, value) => padding.setSideValue(side, value)}
        />
      )}
    </Panel>
  )
}

export default BuilderLayout
