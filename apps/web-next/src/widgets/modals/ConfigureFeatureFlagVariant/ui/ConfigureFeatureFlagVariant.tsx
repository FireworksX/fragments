import { FC, useContext, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useGraph, useGraphFields } from '@graph-state/react'
import { Modal } from '@/shared/ui/Modal'
import { ModalContainer } from '@/shared/ui/ModalContainer'
import { Button } from '@/shared/ui/Button'
import { InputText } from '@/shared/ui/InputText'
import { InputNumber } from '@/shared/ui/InputNumber'
import { modalStore } from '@/shared/store/modal.store'
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

interface CreateCustomBreakpointProps {
  className?: string
}

export interface CreateCustomBreakpointContext {
  onAdd?: (name: string, width: number) => void
}

export const ConfigureFeatureFlagVariant: FC<CreateCustomBreakpointProps> = ({ className }) => {
  const { openModal, modal } = useModal()
  const [name, setName] = useState('')
  const [width, setWidth] = useState(0)
  const context = modal?.context ?? {}

  return (
    <Modal className={cn(styles.root, className)} isOpen={modal?.name === modalNames.configureFeatureFlagVariant}>
      <ModalContainer
        title='Configure Variant'
        footer={
          <>
            <Button mode='secondary' stretched onClick={modalStore.close}>
              Cancel
            </Button>
            <Button stretched onClick={() => context?.onAdd(name, width)}>
              Add
            </Button>
          </>
        }
        onBack={() => undefined}
        onClose={modalStore.close}
      >
        <Panel>
          <ControlRow title='Name'>
            <ControlRowWide>
              <InputText placeholder='Name' />
            </ControlRowWide>
          </ControlRow>

          <ControlRow title='Status'>
            <ControlRowWide>
              <Dropdown
                options={
                  <DropdownGroup>
                    <DropdownOption>Active</DropdownOption>
                    <DropdownOption>Pause</DropdownOption>
                  </DropdownGroup>
                }
              >
                <SelectMimicry>Active</SelectMimicry>
              </Dropdown>
            </ControlRowWide>
          </ControlRow>

          <ControlRow title='Rollout'>
            <InputNumber suffix='%' />
            <Slider value={30} />
          </ControlRow>

          <ControlRow title='Fragment'>
            <ControlRowWide>
              <InputSelect
                icon={<FragmentIcon color='var(--text-color)' />}
                color='var(--component)'
                placeholder='Set...'
                onReset={() => undefined}
                onClick={() =>
                  openModal(modalNames.projectTree, {
                    onBack: () => {
                      openModal(modalNames.configureFeatureFlagVariant, context)
                    }
                  })
                }
              ></InputSelect>
            </ControlRowWide>
          </ControlRow>
        </Panel>
      </ModalContainer>
    </Modal>
  )
}
