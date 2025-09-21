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

interface Props {
  className?: string
}

interface State {
  _id?: string
  name: string
  required: boolean
  isTextarea: boolean
  placeholder: string
  defaultValue: string
}

export interface PropertyStringContext {
  isEdit?: boolean
  initialState?: State
  onSubmit?: (state: State) => void
}

const initial: State = getNormalizeLayer({
  _type: definition.nodes.Variable,
  _id: 'replaceBeforeSave',
  type: definition.variableType.String,
  name: 'String property'
})

export const PropertyString: FC<Props> = ({ className }) => {
  const formId = useId()
  const { open: openModal, close: closeModal, readContext } = useModal()
  const context = readContext(modalNames.propertyString) ?? {}
  const isEdit = context?.isEdit ?? false

  const [state, setState] = useState<State>(() => context?.initialState ?? initial)

  const setField = (field: keyof typeof state, value: unknown) =>
    setState(prev => ({
      ...prev,
      [field]: value
    }))

  return (
    <ModalContainer
      width={300}
      title={isEdit ? 'Configure Property' : 'Create Property'}
      footer={
        <>
          <Button mode='secondary' stretched onClick={closeModal}>
            Cancel
          </Button>
          <Button type='submit' form={formId} stretched>
            {isEdit ? 'Update' : 'Create'}
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
        <PropertyContentString
          id={isEdit ? state._id : null}
          name={{
            value: state.name,
            onChange: v => setField('name', v)
          }}
          required={{
            value: state.required,
            onChange: v => setField('required', v)
          }}
          isTextarea={{
            value: state.isTextarea,
            onChange: v => setField('isTextarea', v)
          }}
          placeholder={{
            value: state.placeholder,
            onChange: v => setField('placeholder', v)
          }}
          defaultValue={{
            value: state.defaultValue,
            onChange: v => setField('defaultValue', v)
          }}
        />
      </form>
    </ModalContainer>
  )
}
