import { FC, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useBuilderStyles } from '../hooks/useBuilderStyles'
import { GraphValue } from '@graph-state/react'
import { builderBorderType, builderNodes, builderPaintMode } from '@fragments/fragments-plugin/performance'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { to } from '@react-spring/web'
import { Panel } from '@/shared/ui/Panel'
import { Dropdown } from '@/shared/ui/Dropdown'
import { DropdownGroup } from '@/shared/ui/DropdownGroup'
import { DropdownOption } from '@/shared/ui/DropdownOption'
import { PanelHeadAside } from '@/shared/ui/PanelHeadAside'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputNumber } from '@/shared/ui/InputNumber'
import { Slider } from '@/shared/ui/Slider'
import { TabsSelector } from '@/shared/ui/TabsSelector'
import { InputSelect } from '@/shared/ui/InputSelect'
import { Select } from '@/shared/ui/Select'
import { capitalize } from '@/shared/utils/capitalize'
import { AnimatedVisible } from '@/shared/ui/AnimatedVisible'
import { BuilderStylesCorners } from '@/features/fragmentBuilder/BuilderStylesCorners'
import { Stepper } from '@/shared/ui/Stepper'
import { useDisplayColor } from '@/shared/hooks/fragmentBuilder/useDisplayColor'

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