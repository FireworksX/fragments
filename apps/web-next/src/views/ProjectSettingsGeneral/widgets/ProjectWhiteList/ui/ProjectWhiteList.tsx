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

interface ProjectWhiteListProps {
  className?: string
}

export const ProjectWhiteList: FC<ProjectWhiteListProps> = ({ className }) => {
  const [list, setList] = useState([
    {
      id: 'ff',
      name: 'https://scores24.live'
    }
  ])
  const { loading } = useProject()

  const creatingInputRef = useRef<ComponentRef<'input'>>(null)
  const [isCreatingToken, setIsCreatingToken] = useState(false)
  const [creatingName, setCreatingName] = useState('')

  return (
    <InfoSection
      loading={loading}
      header={
        <InfoSectionHeader title='Sites Whitelist' description='Add allowed sites for destribution of contents.' />
      }
    >
      {list.map(token => (
        <InfoSectionCell key={token.id} className={styles.row} title={token.name ?? 'default'}>
          <Button icon={<RemoveIcon />} mode='secondary'>
            Remove
          </Button>
        </InfoSectionCell>
      ))}

      <InfoSectionCell className={styles.row}>
        {isCreatingToken ? (
          <>
            <InputText
              ref={creatingInputRef}
              classNameInput={styles.input}
              value={creatingName}
              onChangeValue={setCreatingName}
            />
            <Button
              icon={<CheckIcon />}
              // loading={creatingPublicToken}
              disabled={creatingName?.length <= 2}
              mode='success'
              // onClick={handleCreatePublicToken}
            >
              Done
            </Button>
            <Button icon={<CloseIcon />} mode='secondary' onClick={() => setIsCreatingToken(false)}>
              Cancel
            </Button>
          </>
        ) : (
          <Button icon={<PlusIcon />} onClick={() => setIsCreatingToken(true)}>
            Add token
          </Button>
        )}
      </InfoSectionCell>
    </InfoSection>
  )
}
