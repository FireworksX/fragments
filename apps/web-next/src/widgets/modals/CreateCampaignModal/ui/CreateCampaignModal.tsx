'use client'
import { FC, useContext, useEffect, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useGraph } from '@graph-state/react'
import { Modal } from '@/shared/ui/Modal'
import { ModalContainer } from '@/shared/ui/ModalContainer'
import { Button } from '@/shared/ui/Button'
import { FormField } from '@/shared/ui/FormField'
import { InputText } from '@/shared/ui/InputText'
import { ImageSelector } from '@/shared/ui/ImageSelector'
import { useUploadFile } from '@/shared/hooks/useUploadFile'
import { modalStore } from '@/shared/store/modal.store'
import { modalNames } from '@/shared/data'
import { Textarea } from '@/shared/ui/Textarea'

interface CreateCampaignModalProps {
  className?: string
}

interface CreatedProjectInfo {
  name: string
  logo?: number
}

export interface CreateProjectModalContext {
  onCreate: (project: CreatedProjectInfo) => void
}

const CreateCampaignModal: FC<CreateCampaignModalProps> = ({ className }) => {
  const [modal] = useGraph(modalStore, modalStore.key)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const context = modal?.context
  const loading = context?.loading ?? false

  const handleCreate = () => {
    context?.onCreate({
      name,
      description
    })
  }

  useEffect(() => {
    setName('')
  }, [modal?.name])

  return (
    <Modal className={cn(styles.root, className)} isOpen={modal?.name === modalNames.createCampaign}>
      <ModalContainer
        title='Create Campaign'
        footer={
          <>
            <Button mode='secondary' stretched onClick={modalStore.close}>
              Cancel
            </Button>
            <Button stretched loading={loading} onClick={handleCreate}>
              Create
            </Button>
          </>
        }
      >
        <div className={styles.body}>
          <FormField label='Campaign Name'>
            <InputText placeholder='Name' value={name} autoFocus onChangeValue={setName} />
          </FormField>

          <FormField label='Description'>
            <Textarea value={description} onChange={setDescription} />
          </FormField>
        </div>
      </ModalContainer>
    </Modal>
  )
}

export default CreateCampaignModal
