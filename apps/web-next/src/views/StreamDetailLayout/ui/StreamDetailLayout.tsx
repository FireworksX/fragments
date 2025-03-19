'use client'
import cn from 'classnames'
import styles from './styles.module.css'
import { Button } from '@/shared/ui/Button'
import DeleteIcon from '@/shared/icons/next/trash.svg'
import { useStreamDetailLayout } from '@/views/StreamDetailLayout/hooks/useStreamDetailLayout'
import { ToggleActiveButton } from '@/features/ToggleActiveButton/ui/ToggleActiveButton'
import { Touchable } from '@/shared/ui/Touchable'
import ArrowLeftIcon from '@/shared/icons/next/arrow-left.svg'
import EditIcon from '@/shared/icons/next/pencil.svg'
import DoneIcon from '@/shared/icons/next/check.svg'
import PlusIcon from '@/shared/icons/next/plus.svg'
import { Chip } from '@/shared/ui/Chip'
import { Link } from '@/shared/ui/Link'
import { InputText } from '@/shared/ui/InputText'
import { StreamFilterDevices } from '@/views/StreamDetailLayout/widgets/StreamFilterDevices'
import { DeviceType } from '@/graphql/types'
import { useState } from 'react'
import { StreamFilterOperationals } from '@/views/StreamDetailLayout/widgets/StreamFilterOperationals'

export const StreamDetailLayout = ({ children }) => {
  const {
    stream,
    localStream,
    loadingChangeStreamActive,
    loadingUpdateStream,
    toggleActive,
    setIsEditMode,
    isEditMode,
    streamSlug,
    updateLocalStream,
    handleUpdateStream
  } = useStreamDetailLayout()

  const [v, sv] = useState([])

  return (
    <div className={cn(styles.root)}>
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
            <Chip prefix='Location:' onRemove={isEditMode && (() => undefined)}>
              Canada
            </Chip>

            <StreamFilterDevices value={v} onChange={sv} />
            <StreamFilterOperationals />

            {isEditMode && (
              <Chip>
                <PlusIcon />
                Add filter
              </Chip>
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

              <Link type='editStream'>
                <Button
                  mode='outline'
                  preventDefault
                  loading={loadingUpdateStream}
                  icon={<EditIcon />}
                  onClick={() => setIsEditMode(true)}
                >
                  Edit
                </Button>
              </Link>

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
            <Button
              mode='primary'
              preventDefault
              loading={loadingUpdateStream}
              icon={<DoneIcon />}
              onClick={handleUpdateStream}
            >
              Done
            </Button>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}
