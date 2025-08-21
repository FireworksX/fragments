import { FC } from 'react'
import { definition } from '@fragmentsx/definition'
import cn from 'classnames'
import styles from './styles.module.css'
import Icon from '@/shared/icons/next/move-horizontal.svg'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputSelect } from '@/shared/ui/InputSelect'
import { useBuilderSizeOptionals } from '../hooks/useBuilderSizeOptionals'
import { Dropdown } from '@/shared/ui/Dropdown'
import { DropdownGroup } from '@/shared/ui/DropdownGroup'
import { DropdownOption } from '@/shared/ui/DropdownOption'
import { InputNumber } from '@/shared/ui/InputNumber'
import { Select } from '@/shared/ui/Select'

interface BuilderSizeMinMaxProps {
  className?: string
}

const Options = () => (
  <>
    <option value={definition.sizing.Relative}>Rel</option>
    <option value={definition.sizing.Fixed}>Fixed</option>
  </>
)

export const BuilderSizeMinMax: FC<BuilderSizeMinMaxProps> = ({ className }) => {
  const minWidth = useBuilderSizeOptionals('minWidth', 'Min Width')
  const minHeight = useBuilderSizeOptionals('minHeight', 'Min Height')
  const maxWidth = useBuilderSizeOptionals('maxWidth', 'Max Width')
  const maxHeight = useBuilderSizeOptionals('maxHeight', 'Max Height')

  const fields = [minWidth, minHeight, maxWidth, maxHeight]
  const isEmpty = fields.every(field => field.enabled)

  return (
    <>
      {fields.map(
        field =>
          field.enabled && (
            <ControlRow key={field.label} title={field.label} actions={[[{ label: 'Remove', onClick: field.disable }]]}>
              <InputNumber value={field.valueInfo.value$} onChange={field.setValue} />
              <Select value={field.valueType} onChange={field.setValueType}>
                <Options />
              </Select>
            </ControlRow>
          )
      )}
      {!isEmpty && (
        <ControlRow>
          <ControlRowWide>
            <Dropdown
              trigger='click'
              hideOnClick
              options={
                <DropdownGroup>
                  {fields.map(field => (
                    <DropdownOption key={field.label} disabled={field.enabled} onClick={field.enable}>
                      {field.label}
                    </DropdownOption>
                  ))}
                </DropdownGroup>
              }
            >
              <InputSelect hasIcon icon={<Icon style={{ color: 'var(--secondary)' }} />}>
                Add min/max
              </InputSelect>
            </Dropdown>
          </ControlRowWide>
        </ControlRow>
      )}
    </>
  )
}
