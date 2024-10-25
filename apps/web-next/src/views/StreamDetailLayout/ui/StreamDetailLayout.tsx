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

export const StreamDetailLayout = ({ children }) => {
  const { stream, loadingChangeStreamActive, toggleActive, isEditMode, streamSlug, projectSlug, campaignSlug } =
    useStreamDetailLayout()

  return (
    <div className={cn(styles.root)}>
      <Touchable className={styles.backAction} effect='none'>
        <ArrowLeftIcon />
        Back to campaign
      </Touchable>
      <div className={styles.header}>
        <div className={styles.logo}></div>
        <div className={styles.headerData}>
          <div className={styles.name}>
            {isEditMode ? (
              <InputText placeholder='Stream Name' value={stream?.name} />
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
            <Chip prefix='Device type:' onRemove={isEditMode && (() => undefined)}>
              {' '}
              Mobile
            </Chip>
            <Chip prefix='Device OS:' onRemove={isEditMode && (() => undefined)}>
              {' '}
              iOS
            </Chip>
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

              <Link type='editStream' projectSlug={projectSlug} campaignSlug={campaignSlug} streamSlug={streamSlug}>
                <Button
                  mode='outline'
                  preventDefault
                  // loading={loadingUpdateStream}
                  icon={<EditIcon />}
                  // onClick={toggleActive}
                >
                  Edit
                </Button>
              </Link>

              <Button
                mode='danger-outline'
                preventDefault
                // loading={loadingUpdateStream}
                icon={<DeleteIcon />}
                // onClick={toggleActive}
              >
                Delete
              </Button>
            </>
          ) : (
            <Link type='stream' projectSlug={projectSlug} campaignSlug={campaignSlug} streamSlug={streamSlug}>
              <Button
                mode='primary'
                preventDefault
                // loading={loadingUpdateStream}
                icon={<DoneIcon />}
                // onClick={toggleActive}
              >
                Done
              </Button>
            </Link>
          )}
        </div>
      </div>

      {children}
    </div>
  )
}
