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
import { useAreaProperties } from '@/shared/hooks/useAreaProperties'

interface CreateCustomBreakpointProps {
  className?: string
}

export type ConfigureFragmentVariantProps = Record<string, unknown>

export interface ConfigureFragmentVariantContext {
  fragmentId: number
  initialProps?: ConfigureFragmentVariantProps
  onSubmit?: (props: ConfigureFragmentVariantProps) => void
}

export const ConfigureFragmentVariant: FC<CreateCustomBreakpointProps> = ({ className }) => {
  const { close: closeModal, readContext } = useModal()
  const context = readContext(modalNames.configureFragmentVariant)
  const { properties } = useAreaProperties()

  const [props, setProps] = useState(context?.initialProps ?? {})

  return (
    <ModalContainer
      className={styles.root}
      title='Configure Fragment'
      footer={
        <>
          <Button mode='secondary' stretched onClick={closeModal}>
            Cancel
          </Button>
          <Button stretched onClick={() => context?.onSubmit(props)}>
            Save
          </Button>
        </>
      }
    >
      <div className={styles.preview}>
        <FragmentPreviewSandbox
          fragmentId={context?.fragmentId}
          areaProperties={properties}
          initialProps={props}
          onChangeProps={setProps}
        />
      </div>
    </ModalContainer>
  )
}
