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
import { StatusDot } from '@/shared/ui/StatusDot'
import { capitalize } from '@/shared/utils/capitalize'

interface CreateCustomBreakpointProps {
  className?: string
}

export interface CreateCustomBreakpointContext {
  onAdd?: (name: string, width: number) => void
}

export const ConfigureFeatureFlagVariant: FC<CreateCustomBreakpointProps> = ({ className }) => {
  const { openModal, modal } = useModal()
  const context = modal?.context ?? {}
  const isEdit = context?.isEdit ?? false

  const [featureFlag, setFeatureFlag] = useState(
    () => context?.initialState ?? { name: '', status: 'pause', rollout: 0, fragment: null }
  )

  const indicatorMap = {
    pause: 'warning',
    active: 'success'
  }

  const setField = (field: keyof typeof featureFlag, value: unknown) =>
    setFeatureFlag(prev => ({
      ...prev,
      [field]: value
    }))

  return (
    <Modal className={cn(styles.root, className)} isOpen={modal?.name === modalNames.configureFeatureFlagVariant}>
      <ModalContainer
        title={isEdit ? 'Configure Variant' : 'Create Variant'}
        footer={
          <>
            <Button mode='secondary' stretched onClick={modalStore.close}>
              Cancel
            </Button>
            <Button stretched onClick={() => context?.onSubmit?.(featureFlag)}>
              {isEdit ? 'Update' : 'Create'}
            </Button>
          </>
        }
        onClose={modalStore.close}
      >
        <Panel>
          <ControlRow title='Name'>
            <ControlRowWide>
              <InputText placeholder='Name' value={featureFlag.name} onChangeValue={v => setField('name', v)} />
            </ControlRowWide>
          </ControlRow>

          <ControlRow title='Status'>
            <ControlRowWide className={styles.relative}>
              <Dropdown
                width='contentSize'
                placement='bottom-end'
                hideOnClick
                arrow={false}
                trigger='click'
                options={
                  <DropdownGroup>
                    <DropdownOption icon={<StatusDot status='success' />} onClick={() => setField('status', 'active')}>
                      Active
                    </DropdownOption>
                    <DropdownOption icon={<StatusDot status='warning' />} onClick={() => setField('status', 'pause')}>
                      Pause
                    </DropdownOption>
                  </DropdownGroup>
                }
              >
                <SelectMimicry>
                  <div className={styles.statusRow}>
                    <StatusDot status={indicatorMap[featureFlag.status]} />
                    {capitalize(featureFlag.status)}
                  </div>
                </SelectMimicry>
              </Dropdown>
            </ControlRowWide>
          </ControlRow>

          <ControlRow title='Rollout'>
            <InputNumber suffix='%' value={featureFlag.rollout} onChange={v => setField('rollout', v)} />
            <Slider value={featureFlag.rollout} onChange={v => setField('rollout', v)} />
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
                    },
                    onClick: item => {
                      openModal(modalNames.configureFragmentVariant, {
                        fragment: item.id,
                        onBack: () => {
                          openModal(modalNames.configureFeatureFlagVariant, context)
                        }
                      })
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
