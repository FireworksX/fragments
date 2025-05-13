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
import { StatusBadge } from '@/shared/ui/StatusBadge'
import { ContentEditable } from '@/shared/ui/ContentEditable'
import { StreamFilterWeight } from '@/views/StreamDetailLayout/widgets/StreamFilterWeight'
import { Container } from '@/shared/ui/Container'

interface StreamHeaderProps {
  className?: string
}

export const StreamHeader: FC<StreamHeaderProps> = ({ className }) => {
  const { handleUpdateStream, loadingDeleteStream, handleDeleteStream, stream, filters, toggleActive } =
    useStreamHeader()

  return (
    <Container className={cn(styles.root, className)}>
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
            <ContentEditable value={stream?.name} onSubmit={name => handleUpdateStream({ name })} />
            <span className={styles.id}>#{stream?.id}</span>
            <StatusBadge status={stream?.active ? 'success' : 'warning'} />
          </div>

          <div className={styles.filters}>
            <StreamFilterWeight value={stream?.weight} onChange={weight => handleUpdateStream({ weight })} />
            {/*<StreamFilterLocation isEdit={isEditMode} />*/}
            <StreamFilterDevices value={filters.deviceType} />
            <StreamFilterOperationals value={filters.osType} />

            {/*{isEditMode && (*/}
            {/*  <Dropdown*/}
            {/*    trigger='click'*/}
            {/*    options={*/}
            {/*      <DropdownGroup>*/}
            {/*        <DropdownOption>Location</DropdownOption>*/}
            {/*        <DropdownOption>Device type</DropdownOption>*/}
            {/*        <DropdownOption>OS type</DropdownOption>*/}
            {/*      </DropdownGroup>*/}
            {/*    }*/}
            {/*  >*/}
            {/*    <Chip>*/}
            {/*      <PlusIcon />*/}
            {/*      Add filter*/}
            {/*    </Chip>*/}
            {/*  </Dropdown>*/}
            {/*)}*/}
          </div>
        </div>

        <div className={styles.headerAside}>
          <ToggleActiveButton isActive={stream?.active} onClick={toggleActive} />

          <Button
            mode='danger-outline'
            loading={loadingDeleteStream}
            preventDefault
            icon={<DeleteIcon />}
            onClick={handleDeleteStream}
          >
            Delete
          </Button>
        </div>
      </div>
    </Container>
  )
}
