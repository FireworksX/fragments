'use client'
import { FC, useContext, useEffect, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useGraph } from '@graph-state/react'
import { modalStore } from '@/app/store/modal.store'
import Modal from '@/app/components/Modal/Modal'
import ModalContainer from '@/app/components/ModalContainer/ModalContainer'
import Button from '@/app/components/Button'
import InputText from '@/app/components/InputText/InputText'
import InputNumber from '@/app/components/InputNumber/InputNumber'
import ImageSelector from '@/app/components/ImageSelector/ImageSelector'
import { FormField } from '@/app/components/FormField/FormField'
import { useUploadFile } from '@/app/hooks/useUploadFile'

interface CreateFragmentModalProps {
  className?: string
}

interface CreateFragmentInfo {
  name: string
}

export interface CreateFragmentModalContext {
  onCreate: (project: CreateFragmentInfo) => void
}

const NAME = 'createFragment'

const CreateFragmentModal: FC<CreateFragmentModalProps> = ({ className }) => {
  const [modal] = useGraph(modalStore)
  const [name, setName] = useState('')
  const context = modal.context
  const creating = context?.creating ?? false

  const handleCreate = () => {
    context?.onCreate({
      name
    })
  }

  useEffect(() => {
    setName('')
  }, [modal?.name])

  return (
    <Modal className={cn(styles.root, className)} isOpen={modal?.name === NAME}>
      <ModalContainer
        title='Create Fragment'
        footer={
          <>
            <Button mode='secondary' stretched onClick={modalStore.close}>
              Cancel
            </Button>
            <Button stretched loading={creating} onClick={handleCreate}>
              Create
            </Button>
          </>
        }
      >
        <div className={styles.body}>
          <InputText placeholder='Name' value={name} autoFocus onChange={setName} />
        </div>
      </ModalContainer>
    </Modal>
  )
}

export default CreateFragmentModal
