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
import { CampaignStatus, VariantStatus } from '@/__generated__/types'
import { useReadProjectTreeItem } from '@/shared/api/fragment/query/useReadProjectTreeItem'
import { projectItemType } from '@/widgets/ProjectTree/hooks/useProjectTree'
import { pick } from '@fragmentsx/utils'

interface CreateCustomBreakpointProps {
  className?: string
}

export interface CreateCustomBreakpointContext {
  onAdd?: (name: string, width: number) => void
}

const initialCampaign = {
  name: 'Campaign',
  status: 'active'
}

export const ConfigureCampaign: FC<CreateCustomBreakpointProps> = ({ className }) => {
  const { openModal, modal } = useModal()
  const context = modal?.context ?? {}
  const isEdit = context?.isEdit ?? false
  const countCampaigns = context?.countCampaigns ?? 0
  const isOpen = modal?.name === modalNames.configureCampaign

  const [campaign, setCampaign] = useState(() => context?.initialState ?? {})
  //
  // const fragmentInfo = useReadProjectTreeItem({ type: projectItemType.fragment, id: featureFlag?.fragmentId })
  //
  const setField = (field: keyof typeof campaign, value: unknown) =>
    setCampaign(prev => ({
      ...prev,
      [field]: value
    }))
  //
  useEffect(() => {
    setField('name', `Campaign ${countCampaigns + 1}`)
  }, [countCampaigns, isOpen])
  //
  useEffect(() => {
    if (context?.initialState) {
      setCampaign(context?.initialState)
    }
  }, [isOpen, context?.initialState])

  return (
    <Modal className={cn(styles.root, className)} isOpen={isOpen}>
      <ModalContainer
        title={isEdit ? 'Configure Campaign' : 'Create Campaign'}
        footer={
          <>
            <Button mode='secondary' stretched onClick={modalStore.close}>
              Cancel
            </Button>
            <Button type='submit' stretched onClick={() => context?.onSubmit?.(campaign)}>
              {isEdit ? 'Update' : 'Create'}
            </Button>
          </>
        }
        onClose={modalStore.close}
      >
        <form
          onSubmit={event => {
            event.preventDefault()
            context?.onSubmit?.(campaign)
          }}
        >
          <Panel>
            <ControlRow title='Name'>
              <ControlRowWide>
                <InputText placeholder='Name' value={campaign.name} onChangeValue={v => setField('name', v)} />
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
                      <StatusDot status={campaign.status === CampaignStatus.Active ? 'success' : 'warning'} />
                      {campaign.status === CampaignStatus.Active ? statusToLabel.ACTIVE : statusToLabel.INACTIVE}
                    </div>
                  </SelectMimicry>
                </Dropdown>
              </ControlRowWide>
            </ControlRow>
          </Panel>
        </form>
      </ModalContainer>
    </Modal>
  )
}
