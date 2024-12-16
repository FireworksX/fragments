import { FC, use, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useBuilderStyles } from '../hooks/useBuilderStyles'
import { GraphValue } from '@graph-state/react'
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
import { borderType, paintMode } from '@fragments/plugin-fragment-spring'
import { isValue } from '@fragments/utils'

interface BuilderStylesProps {
  className?: string
}

const ALLOW_FILL_TYPES = [paintMode.Solid]

const BuilderStyles: FC<BuilderStylesProps> = ({ className }) => {
  const { documentManager } = use(BuilderContext)
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
              <AnimatedVisible visible={to(zIndex.value, v => !isValue(v))}>
                <DropdownOption onClick={zIndex.onClick}>Z Index</DropdownOption>
              </AnimatedVisible>
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
            <GraphValue graphState={documentManager} field={fill.value} options={{ safe: true }}>
              {value => {
                return (
                  <>
                    <InputSelect
                      hasIcon={to(fill.type, v => !!value && ALLOW_FILL_TYPES.includes(v))}
                      color={getColor(value)}
                      onReset={fill.onReset}
                      onClick={fill.onClick}
                    >
                      {value &&
                        to(fill.type, v =>
                          ALLOW_FILL_TYPES.includes(v) ? getNameColor(value) : v === paintMode.Image ? 'Image' : ''
                        )}
                    </InputSelect>
                  </>
                )
              }}
            </GraphValue>
          </ControlRowWide>
        </ControlRow>
      )}

      {!overflow.disabled && (
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
      )}

      {!radius.disabled && (
        <>
          <ControlRow title='Radius' actions={radius.actions} isHighlight={radius.isOverride}>
            <InputNumber value={radius.value} empty={radius.cornerMode === 'sides'} onChange={radius.onChange} />
            <TabsSelector
              cellClassName={styles.borderCell}
              items={radius.items}
              value={radius.cornerMode}
              onChange={({ name }) => radius.setCornerMode(name)}
            />
          </ControlRow>
          {radius.cornerMode === 'sides' && (
            <BuilderStylesCorners
              values={radius.sidesValues}
              focusCorner={radius.setCornerSide}
              onChange={(side, value) => radius.setCornerSideValue(side, value)}
            />
          )}
        </>
      )}

      {!border.disabled && (
        <ControlRow title='Border' actions={border.actions} isHighlight={border.isOverride}>
          <ControlRowWide>
            <GraphValue graphState={documentManager} field={border.borderColorInvoker.value} options={{ safe: true }}>
              {value => (
                <>
                  <InputSelect
                    placeholder='Add...'
                    hasIcon={to(value, v => !!v && v !== borderType.None)}
                    color={getColor(value)}
                    onReset={border.onReset}
                    onClick={border.onClick}
                  >
                    {value && to(border.borderTypeInvoker.value, v => (v !== borderType.None ? v : ''))}
                  </InputSelect>
                </>
              )}
            </GraphValue>
          </ControlRowWide>
        </ControlRow>
      )}

      <AnimatedVisible visible={to(zIndex.value, isValue)}>
        <ControlRow title='Z Index' actions={zIndex.actions} isHighlight={zIndex.isOverride}>
          <InputNumber value={zIndex.value} onChange={zIndex.onChange} />
          <Stepper value={zIndex.value} onChange={zIndex.onChange} />
        </ControlRow>
      </AnimatedVisible>
    </Panel>
  )
}

export default BuilderStyles
