'use client'
import { FC, useContext } from 'react'
import cn from 'classnames'
// import { StatexValue } from '@adstore/statex-react'
// import { useStore } from '@nanostores/react'
import styles from './styles.module.css'
import { useBuilderStyles } from './hooks/useBuilderStyles'
import Dropdown from '@/app/components/Dropdown/Dropdown'
import DropdownGroup from '@/app/components/Dropdown/components/DropdownGroup/DropdownGroup'
import InputNumber from '@/app/components/InputNumber/InputNumber'
import Slider from '@/app/components/Slider/Slider'
import TabsSelector from '@/app/components/TabsSelector'
import DropdownOption from '@/app/components/Dropdown/components/DropdownOption/DropdownOption'
import InputSelect from '@/app/components/InputSelect/InputSelect'
import Stepper from '@/app/components/Stepper/Stepper'
import { GraphValue } from '@graph-state/react'
import { builderBorderType, builderNodes, builderPaintMode } from '@fragments/fragments-plugin/performance'
import { useDisplayColor } from '@/builder/hooks/useDisplayColor'
import Panel from '@/builder/components/Panel/Panel'
import PanelHeadAside from '@/builder/components/PanelHeadAside/PanelHeadAside'
import ControlRow from '@/builder/components/ControlRow/ControlRow'
import ControlRowWide from '@/builder/components/ControlRow/components/ControlRowWide/ControlRowWide'
import { BuilderContext } from '@/builder/BuilderContext'
import { SpringValue, to } from '@react-spring/web'
import BuilderStylesCorners from './components/BuilderStylesCorners/BuilderStylesCorners'
import { AnimatedVisible } from '@/app/components/AnimatedVisible/AnimatedVisible'
import Select from '@/app/components/Select/Select'
import { capitalize } from '@/app/utils/capitalize'

interface BuilderStylesProps {
  className?: string
}

const ALLOW_FILL_TYPES = [builderPaintMode.Solid]

const BuilderStyles: FC<BuilderStylesProps> = ({ className }) => {
  const { documentManager } = useContext(BuilderContext)
  const { selectionGraph, opacity, overflow, visible, zIndex, radius, fill, border } = useBuilderStyles()
  const { getColor, getNameColor } = useDisplayColor(documentManager)

  return (
    <Panel
      className={cn(styles.root, className)}
      title='Styles'
      aside={
        <Dropdown
          trigger='click'
          options={
            <DropdownGroup>
              {zIndex.disabled && <DropdownOption onClick={zIndex.onClick}>Z Index</DropdownOption>}
            </DropdownGroup>
          }
        >
          <PanelHeadAside />
        </Dropdown>
      }
    >
      <ControlRow title='Opacity' {...opacity}>
        <InputNumber value={opacity.value} step={0.1} max={1} min={0} onChange={opacity.onChange} />
        <Slider value={opacity.value} step={0.1} max={1} min={0} onChange={opacity.onChange} />
      </ControlRow>

      <ControlRow title='Visible' {...visible}>
        <ControlRowWide>
          <TabsSelector items={visible.items} value={visible.value} onChange={({ name }) => visible.onChange(name)} />
        </ControlRowWide>
      </ControlRow>

      {!fill.disabled && (
        <ControlRow title='Fill' {...fill}>
          <ControlRowWide>
            <GraphValue graphState={documentManager} field={fill.value}>
              {value => {
                return (
                  <>
                    <InputSelect
                      hasIcon={value && to(fill.type, v => ALLOW_FILL_TYPES.includes(v))}
                      color={getColor(value)}
                      onReset={fill.onReset}
                      onClick={fill.onClick}
                    >
                      {value &&
                        to(fill.type, v =>
                          ALLOW_FILL_TYPES.includes(v)
                            ? getNameColor(value)
                            : v === builderPaintMode.Image
                            ? 'Image'
                            : ''
                        )}
                    </InputSelect>
                  </>
                )
              }}
            </GraphValue>
          </ControlRowWide>
        </ControlRow>
      )}

      <ControlRow title='Overflow' {...overflow}>
        <ControlRowWide>
          <Select {...overflow}>
            {overflow.options.map(value => (
              <option key={value} value={value}>
                {capitalize(value)}
              </option>
            ))}
          </Select>
        </ControlRowWide>
      </ControlRow>

      {!radius.disabled && (
        <>
          <ControlRow title='Radius' actions={radius.actions} isHighlight={radius.isOverride}>
            <InputNumber value={radius.value} empty={radius.isMixed} onChange={radius.onChange} />
            <TabsSelector
              items={radius.items}
              value={radius.mode}
              onChange={({ name }) => radius.onChangeRadiusMode(name)}
            />
          </ControlRow>
          <AnimatedVisible visible={radius.isMixed}>
            <BuilderStylesCorners
              values={radius.sidesInvoker.value}
              focusCorner={radius.setCornerSide}
              onChange={(side, value) => radius.sidesInvoker.onChange({ side, value })}
            />
          </AnimatedVisible>
        </>
      )}

      {!border.disabled && (
        <ControlRow title='Border' actions={border.actions} isHighlight={border.isOverride}>
          <ControlRowWide>
            <GraphValue graphState={documentManager} field={border.borderColorInvoker.value}>
              {value => (
                <InputSelect
                  placeholder='Add...'
                  hasIcon={value && to(border.borderTypeInvoker.value, v => v !== builderBorderType.None)}
                  color={getColor(value)}
                  onReset={border.onReset}
                  onClick={border.onClick}
                >
                  {value && to(border.borderTypeInvoker.value, v => (v !== builderBorderType.None ? v : ''))}
                </InputSelect>
              )}
            </GraphValue>
          </ControlRowWide>
        </ControlRow>
      )}

      {!zIndex.disabled && (
        <ControlRow title='Z Index' actions={zIndex.actions} isHighlight={zIndex.isOverride}>
          <InputNumber value={zIndex.value} onChange={zIndex.onChange} />
          <Stepper value={zIndex.value} onChange={zIndex.onChange} />
        </ControlRow>
      )}
    </Panel>
  )
}

export default BuilderStyles
