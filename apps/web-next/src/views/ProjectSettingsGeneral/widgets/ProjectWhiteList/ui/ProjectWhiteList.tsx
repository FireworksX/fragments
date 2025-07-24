import { ComponentRef, FC, useRef, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { InfoSectionHeader } from '@/components/InfoSection/components/InfoSectionHeader'
import { InfoSectionCell } from '@/components/InfoSection/components/InfoSectionCell'
import { InputText } from '@/shared/ui/InputText'
import { Button } from '@/shared/ui/Button'
import RemoveIcon from '@/shared/icons/next/trash.svg'
import CheckIcon from '@/shared/icons/next/check.svg'
import CloseIcon from '@/shared/icons/next/close.svg'
import PlusIcon from '@/shared/icons/next/plus.svg'
import { InfoSection } from '@/components/InfoSection'
import { useProject } from '@/shared/hooks/useProject'
import { useUpdateProjectMutation } from '@/shared/api/project/mutaion/UpdateProject.generated'
import { useAddProjectOriginMutation } from '@/shared/api/project/mutaion/AddProjectOrigin.generated'
import { useRemoveProjectOriginMutation } from '@/shared/api/project/mutaion/RemoveProjectOrigin.generated'

interface ProjectWhiteListProps {
  className?: string
}

export const ProjectWhiteList: FC<ProjectWhiteListProps> = ({ className }) => {
  const { loading, project, projectSlug } = useProject()

  const creatingInputRef = useRef<ComponentRef<'input'>>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [creatingName, setCreatingName] = useState('')
  const [handleAddOrigin, { loading: addLoading }] = useAddProjectOriginMutation()
  const [handleRemoveOrigin, { loading: removeLoading }] = useRemoveProjectOriginMutation()

  return (
    <InfoSection
      loading={loading}
      header={
        <InfoSectionHeader title='Sites Whitelist' description='Add allowed sites for destribution of contents.' />
      }
    >
      {project?.allowedOrigins.map(item => (
        <InfoSectionCell key={item.id} className={styles.row} title={item.origin ?? 'default'}>
          <Button
            icon={<RemoveIcon />}
            loading={removeLoading}
            mode='danger-outline'
            onClick={() => {
              handleRemoveOrigin({
                variables: {
                  projectId: projectSlug,
                  id: item.id
                }
              })
            }}
          >
            Remove
          </Button>
        </InfoSectionCell>
      ))}

      <InfoSectionCell className={styles.row}>
        {isCreating ? (
          <form
            className={styles.row}
            onSubmit={() => {
              handleAddOrigin({
                variables: {
                  projectSlug,
                  origin: creatingName
                }
              })

              setIsCreating(false)
              setCreatingName('')
            }}
          >
            <InputText
              ref={creatingInputRef}
              placeholder='acme.com'
              classNameInput={styles.input}
              value={creatingName}
              onChangeValue={setCreatingName}
            />
            <Button
              type='submit'
              icon={<CheckIcon />}
              loading={addLoading}
              disabled={creatingName?.length <= 2}
              mode='success'
            >
              Done
            </Button>
            <Button icon={<CloseIcon />} mode='secondary' onClick={() => setIsCreating(false)}>
              Cancel
            </Button>
          </form>
        ) : (
          <Button icon={<PlusIcon />} onClick={() => setIsCreating(true)}>
            Add origin
          </Button>
        )}
      </InfoSectionCell>
    </InfoSection>
  )
}
