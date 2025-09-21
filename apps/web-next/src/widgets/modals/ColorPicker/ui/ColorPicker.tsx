import { FC, useContext, useEffect, useId, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useGraph, useGraphFields } from '@graph-state/react'
import { Modal } from '@/shared/ui/Modal'
import { ModalContainer } from '@/shared/ui/ModalContainer'
import { Button } from '@/shared/ui/Button'
import { InputText } from '@/shared/ui/InputText'
import { InputNumber } from '@/shared/ui/InputNumber'
import { modalNames } from '@/shared/data'
import { Panel } from '@/shared/ui/Panel'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputSelect } from '@/shared/ui/InputSelect'
import { SelectMimicry } from '@/shared/ui/SelectMimicry'
import { Dropdown } from '@/shared/ui/Dropdown'
import { DropdownGroup } from '@/shared/ui/DropdownGroup'
import { DropdownOption } from '@/shared/ui/DropdownOption'
import { Slider } from '@/shared/ui/Slider'
import FragmentIcon from '@/shared/icons/next/component.svg'
import { useModal } from '@/shared/hooks/useModal'
import { StatusDot } from '@/shared/ui/StatusDot'
import { capitalize } from '@/shared/utils/capitalize'
import { statusToIndicatorMap, statusToLabel } from '@/shared/data/constants'
import { CampaignStatus, VariantStatus } from '@/__generated__/types'
import { useReadProjectTreeItem } from '@/shared/api/fragment/query/useReadProjectTreeItem'
import { projectItemType } from '@/widgets/ProjectTree/hooks/useProjectTree'
import { generateId, pick } from '@fragmentsx/utils'
import { PropertyContentString } from '@/entities/properyContent/PropertyContentString'
import { getNormalizeLayer, definition } from '@fragmentsx/definition'
import { PropertyContentColor } from '@/entities/properyContent/PropertyContentColor'
import { ColorPicker as ColorPickerComponent } from '@/shared/ui/ColorPicker'

interface Props {
  className?: string
}

export interface ColorPickerContext {
  initialState?: string
  onSubmit?: (state: string) => void
}

export const ColorPicker: FC<Props> = ({ className }) => {
  const formId = useId()
  const { open: openModal, close: closeModal, readContext } = useModal()
  const context = readContext(modalNames.colorPicker) ?? {}

  const [state, setState] = useState<string>(() => context?.initialState ?? 'rgba(0, 0, 0, 1)')

  return (
    <ModalContainer
      title='Color Picker'
      width={300}
      footer={
        <>
          <Button mode='secondary' stretched onClick={closeModal}>
            Cancel
          </Button>
          <Button type='submit' form={formId} stretched>
            Save
          </Button>
        </>
      }
    >
      <form
        id={formId}
        onSubmit={event => {
          event.preventDefault()
          context?.onSubmit?.(state)
        }}
      >
        <ColorPickerComponent
          color={state}
          onChange={color => {
            if (color) {
              setState(color.rgb)
            }
          }}
        />
      </form>
    </ModalContainer>
  )
}
