'use client'
import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Link } from '@/shared/ui/Link'
import { Touchable } from '@/shared/ui/Touchable'
import ArrowLeftIcon from '@/shared/icons/next/arrow-left.svg'
import { InputText } from '@/shared/ui/InputText'
import { StreamFilterLocation } from '@/views/StreamDetailLayout/widgets/StreamFilterLocation'
import { StreamFilterDevices } from '@/views/StreamDetailLayout/widgets/StreamFilterDevices'
import { StreamFilterOperationals } from '@/views/StreamDetailLayout/widgets/StreamFilterOperationals'
import { Dropdown } from '@/shared/ui/Dropdown'
import { DropdownGroup } from '@/shared/ui/DropdownGroup'
import { DropdownOption } from '@/shared/ui/DropdownOption'
import { Chip } from '@/shared/ui/Chip'
import PlusIcon from '@/shared/icons/next/plus.svg'
import { ToggleActiveButton } from '@/features/ToggleActiveButton'
import { Button } from '@/shared/ui/Button'
import EditIcon from '@/shared/icons/next/pencil.svg'
import DeleteIcon from '@/shared/icons/next/trash.svg'
import DoneIcon from '@/shared/icons/next/check.svg'
import CloseIcon from '@/shared/icons/next/close.svg'
import { useStreamHeader } from '@/views/StreamDetailLayout/widgets/StreamHeader/hooks/useStreamHeader'

interface StreamHeaderProps {
  className?: string
}

export const StreamHeader: FC<StreamHeaderProps> = ({ className }) => {
  const {
    isEditMode,
    updateLocalStream,
    handleUpdateStream,
    loadingUpdateStream,
    localStream,
    loadingChangeStreamActive,
    setIsEditMode,
    stream,
    toggleActive
  } = useStreamHeader()

  return (
    <div className={cn(styles.root, className)}>
      <Link type='campaignStreams'>
        <Touchable className={styles.backAction} effect='none'>
          <ArrowLeftIcon />
          Back to campaign
        </Touchable>
      </Link>

      <div className={styles.header}>
        <div className={styles.logo}></div>
        <div className={styles.headerData}>
          <div className={styles.name}>
            {isEditMode ? (
              <InputText
                placeholder='Stream Name'
                value={localStream?.name}
                onChangeValue={name => updateLocalStream({ name })}
              />
            ) : (
              <>
                {stream?.name}
                <span className={styles.id}>#{stream?.id}</span>
                {stream?.active && <span className={styles.liveBadge}>live</span>}
              </>
            )}
          </div>

          <div className={styles.filters}>
            <StreamFilterLocation isEdit={isEditMode} />
            <StreamFilterDevices isEdit={isEditMode} />
            <StreamFilterOperationals isEdit={isEditMode} />

            {isEditMode && (
              <Dropdown
                trigger='click'
                options={
                  <DropdownGroup>
                    <DropdownOption>Location</DropdownOption>
                    <DropdownOption>Device type</DropdownOption>
                    <DropdownOption>OS type</DropdownOption>
                  </DropdownGroup>
                }
              >
                <Chip>
                  <PlusIcon />
                  Add filter
                </Chip>
              </Dropdown>
            )}
          </div>
        </div>

        <div className={styles.headerAside}>
          {!isEditMode ? (
            <>
              <ToggleActiveButton
                isActive={stream?.active}
                loading={loadingChangeStreamActive}
                onClick={toggleActive}
              />

              <Button
                mode='outline'
                preventDefault
                loading={loadingUpdateStream}
                icon={<EditIcon />}
                onClick={() => setIsEditMode(true)}
              >
                Edit
              </Button>

              <Button
                mode='danger-outline'
                preventDefault
                loading={loadingUpdateStream}
                icon={<DeleteIcon />}
                onClick={toggleActive}
              >
                Delete
              </Button>
            </>
          ) : (
            <>
              <Button
                mode='success'
                preventDefault
                loading={loadingUpdateStream}
                icon={<DoneIcon />}
                onClick={handleUpdateStream}
              >
                Done
              </Button>
              <Button mode='secondary' preventDefault icon={<CloseIcon />} onClick={() => setIsEditMode(false)}>
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
