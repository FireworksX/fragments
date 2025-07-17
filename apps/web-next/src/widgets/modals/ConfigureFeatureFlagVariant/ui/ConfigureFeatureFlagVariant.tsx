import { FC, useContext, useEffect, useState } from 'react'
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
import { statusToIndicatorMap, statusToLabel } from '@/shared/data/constants'
import { VariantStatus } from '@/__generated__/types'
import { useReadProjectTreeItem } from '@/shared/api/fragment/query/useReadProjectTreeItem'
import { projectItemType } from '@/widgets/ProjectTree/hooks/useProjectTree'
import { pick } from '@fragmentsx/utils'

interface CreateCustomBreakpointProps {
  className?: string
}

interface State {
  name: string
  status: VariantStatus
  rollout: number
  fragment: {
    id: number | null
    props: unknown | null
  }
}

export interface ConfigureFeatureFlagVariantContext {
  isEdit?: boolean
  countVariants?: number
  initialState?: State
  onSubmit: (state: State) => void
}

export const ConfigureFeatureFlagVariant: FC<CreateCustomBreakpointProps> = ({ className }) => {
  const { open: openModal, close: closeModal, readContext } = useModal()
  const context = readContext(modalNames.configureFeatureFlagVariant) ?? {}
  const isEdit = context?.isEdit ?? false
  const countVariants = context?.countVariants ?? 0

  const [featureFlag, setFeatureFlag] = useState<State>(
    () =>
      context?.initialState ?? {
        name: `Variant ${countVariants + 1}`,
        status: VariantStatus.Inactive,
        rollout: countVariants === 0 ? 100 : 0,
        fragment: {
          id: null,
          props: null
        }
      }
  )

  const fragmentInfo = useReadProjectTreeItem({ type: projectItemType.fragment, id: featureFlag?.fragment.id })

  const setField = <T extends keyof typeof featureFlag>(field: T, value: (typeof featureFlag)[T]) =>
    setFeatureFlag(prev => ({
      ...prev,
      [field]: value
    }))

  // useEffect(() => {
  //   setField('name', `Variant ${countVariants + 1}`)
  //   setField('rollout', context?.initialState?.rollout ?? countVariants === 0 ? 100 : 0)
  // }, [countVariants, isOpen])
  //
  // useEffect(() => {
  //   if (context?.initialState) {
  //     setFeatureFlag(context?.initialState)
  //   }
  // }, [isOpen, context?.initialState])

  return (
    <ModalContainer
      title={isEdit ? 'Configure Variant' : 'Create Variant'}
      footer={
        <>
          <Button mode='secondary' stretched onClick={closeModal}>
            Cancel
          </Button>
          <Button stretched onClick={() => context?.onSubmit?.(featureFlag)}>
            {isEdit ? 'Update' : 'Create'}
          </Button>
        </>
      }
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
                  <DropdownOption
                    icon={<StatusDot status='success' />}
                    onClick={() => setField('status', VariantStatus.Active)}
                  >
                    Active
                  </DropdownOption>
                  <DropdownOption
                    icon={<StatusDot status='warning' />}
                    onClick={() => setField('status', VariantStatus.Inactive)}
                  >
                    Pause
                  </DropdownOption>
                </DropdownGroup>
              }
            >
              <SelectMimicry>
                <div className={styles.statusRow}>
                  <StatusDot status={statusToIndicatorMap[featureFlag.status]} />
                  {statusToLabel[featureFlag?.status]}
                </div>
              </SelectMimicry>
            </Dropdown>
          </ControlRowWide>
        </ControlRow>

        {countVariants > 0 && (
          <ControlRow title='Rollout'>
            <InputNumber suffix='%' value={featureFlag.rollout} onChange={v => setField('rollout', v)} />
            <Slider value={featureFlag.rollout} onChange={v => setField('rollout', v)} />
          </ControlRow>
        )}

        <ControlRow title='Fragment'>
          <ControlRowWide>
            <InputSelect
              icon={<FragmentIcon color='var(--text-color)' />}
              color='var(--component)'
              placeholder='Set...'
              onReset={() => undefined}
              onClick={() => {
                // open(modalNames.projectTree)
                openModal(modalNames.projectTree, {
                  onSelect: item => {
                    openModal(modalNames.configureFragmentVariant, {
                      fragmentId: item.id,
                      onSubmit: props => {
                        openModal(modalNames.configureFeatureFlagVariant, {
                          ...context,
                          initialState: {
                            ...featureFlag,
                            fragment: {
                              id: item.id,
                              props
                            }
                          }
                        })
                      }
                    })
                  }
                })
              }}
            >
              {fragmentInfo?.name}
            </InputSelect>
          </ControlRowWide>
        </ControlRow>
      </Panel>
    </ModalContainer>
  )
}
