'use client'
import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import RemoveIcon from '@/shared/icons/next/trash.svg'
import PlusIcon from '@/shared/icons/next/plus.svg'
import RefreshIcon from '@/shared/icons/next/refresh.svg'
import CloseIcon from '@/shared/icons/next/close.svg'
import CheckIcon from '@/shared/icons/next/check.svg'
import { InfoSectionHeader } from '@/components/InfoSection/components/InfoSectionHeader'
import { InfoSectionCell } from '@/components/InfoSection/components/InfoSectionCell'
import { InputText } from '@/shared/ui/InputText'
import { InfoSection } from '@/components/InfoSection'
import { Button } from '@/shared/ui/Button'
import { useProjectSettingsTokens } from '../hooks/useProjectSettingsTokens'
import { Spinner } from '@/shared/ui/Spinner'

interface ProjectSettingsTokensProps {
  className?: string
}

export const ProjectSettingsTokens: FC<ProjectSettingsTokensProps> = ({ className }) => {
  const {
    handleCreatePublicToken,
    creatingPublicToken,
    isCreatingToken,
    publicTokens,
    loading,
    privateKey,
    handleRefreshPrivateToken,
    refreshingPrivateToken,
    creatingName,
    setCreatingName,
    setIsCreatingToken,
    creatingInputRef,
    removePublicToken
  } = useProjectSettingsTokens()

  return (
    <div className={cn(styles.root, className)}>
      <InfoSection
        loading={loading}
        header={
          <InfoSectionHeader
            title='Publishable key'
            description='This key should be used in your frontend code. It can be safely shared, and does not need to be kept secret.'
          />
        }
      >
        {publicTokens.map(token => (
          <InfoSectionCell key={token.id} className={styles.tokenRow} title={token.name ?? 'default'}>
            <InputText classNameInput={styles.input} value={token.value} />
            <Button icon={<RemoveIcon />} mode='secondary' onClick={() => removePublicToken(token.id)}>
              Remove
            </Button>
          </InfoSectionCell>
        ))}

        <InfoSectionCell className={styles.tokenRow}>
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
                loading={creatingPublicToken}
                disabled={creatingName?.length <= 2}
                mode='success'
                onClick={handleCreatePublicToken}
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

      <InfoSection
        loading={loading}
        header={
          <InfoSectionHeader
            title='Secret keys'
            description='Securely manage these sensitive keys. Do not share them with anyone. If you suspect that one of your secret keys has been compromised, you should create a new key, update your code, then delete the compromised key.'
          />
        }
      >
        <InfoSectionCell className={styles.tokenRow} title='Secret key'>
          <InputText classNameInput={styles.input} value={privateKey?.value} />
          <Button
            loading={refreshingPrivateToken}
            icon={<RefreshIcon />}
            mode='secondary'
            onClick={handleRefreshPrivateToken}
          >
            Refresh
          </Button>
        </InfoSectionCell>
      </InfoSection>
    </div>
  )
}
