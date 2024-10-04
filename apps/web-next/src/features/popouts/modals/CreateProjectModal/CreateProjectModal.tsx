import { FC, useContext, useEffect, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useGraph } from '@graph-state/react'
import { modalStore } from '@/shared/store/modal.store'
import Modal from '@/app/components/Modal/Modal'
import ModalContainer from '@/app/components/ModalContainer/ModalContainer'
import Button from '@/app/components/Button'
import InputText from '@/app/components/InputText/InputText'
import InputNumber from '@/app/components/InputNumber/InputNumber'
import ImageSelector from '@/app/components/ImageSelector/ImageSelector'
import { FormField } from '@/app/components/FormField/FormField'
import { useUploadFile } from '@/app/hooks/useUploadFile'

interface CreateProjectModalProps {
  className?: string
}

interface CreatedProjectInfo {
  name: string
  logo?: number
}

export interface CreateProjectModalContext {
  onCreate: (project: CreatedProjectInfo) => void
}

const NAME = 'createProject'

const CreateProjectModal: FC<CreateProjectModalProps> = ({ className }) => {
  const [modal] = useGraph(modalStore)
  const [name, setName] = useState('')
  const context = modal.context
  const creating = context?.creating ?? false
  const { fetching: uploadingLogo, progress, data, onUpload } = useUploadFile('projectLogo')

  const handleCreate = () => {
    context?.onCreate({
      name,
      logo: data?.id
    })
  }

  useEffect(() => {
    setName('')
  }, [modal?.name])

  return (
    <Modal className={cn(styles.root, className)} isOpen={modal?.name === NAME}>
      <ModalContainer
        title='Create Project'
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
          <FormField label='Project Name'>
            <InputText placeholder='Name' value={name} autoFocus onChange={setName} />
          </FormField>

          <FormField label='Project Logo'>
            <ImageSelector isUploading={uploadingLogo} progress={progress} value={data?.url} onChange={onUpload} />
          </FormField>
        </div>
      </ModalContainer>
    </Modal>
  )
}

export default CreateProjectModal
