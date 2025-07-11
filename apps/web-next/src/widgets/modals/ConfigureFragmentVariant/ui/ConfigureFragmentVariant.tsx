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
import { FragmentPreviewSandbox } from '@/widgets/FragmentPreviewSandbox'
import { noop, omit } from '@fragmentsx/utils'

interface CreateCustomBreakpointProps {
  className?: string
}

export interface CreateCustomBreakpointContext {
  onAdd?: (name: string, width: number) => void
}

export const ConfigureFragmentVariant: FC<CreateCustomBreakpointProps> = ({ className }) => {
  const { openModal, modal } = useModal()
  const context = modal?.context ?? {}
  const fragment = context.fragment
  const isOpen = modal?.name === modalNames.configureFragmentVariant

  const [props, setProps] = useState(omit(context?.initialProps ?? {}, '_type', '_id'))

  const onSubmit = () => context?.onSubmit?.(props) ?? noop

  useEffect(() => {
    if (context?.initialProps) {
      setProps(context?.initialProps)
    }
  }, [isOpen])

  return (
    <Modal className={cn(styles.root, className)} isOpen={isOpen}>
      <ModalContainer
        title='Configure Fragment'
        footer={
          <>
            <Button mode='secondary' stretched onClick={modalStore.close}>
              Cancel
            </Button>
            <Button stretched onClick={onSubmit}>
              Save
            </Button>
          </>
        }
        onClose={modalStore.close}
        onBack={context?.onBack}
      >
        <div className={styles.preview}>
          <FragmentPreviewSandbox fragmentId={fragment} initialProps={props} onChangeProps={setProps} />
        </div>
      </ModalContainer>
    </Modal>
  )
}
