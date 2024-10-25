'use client'
import { FC, useContext, useEffect, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useGraph } from '@graph-state/react'
import { Modal } from '@/shared/ui/Modal'
import { ModalContainer } from '@/shared/ui/ModalContainer'
import { Button } from '@/shared/ui/Button'
import { modalStore } from '@/shared/store/modal.store'
import { modalNames } from '@/shared/data'
import {
  configureStreamViews,
  useConfigureStreamModal
} from '@/widgets/modals/ConfigureStreamModal/hooks/useConfigureStreamModal'
import { ConfigureStreamFragments } from '@/features/stream/ConfigureStreamFragments'
import { ConfigureStreamFilters } from '@/features/stream/ConfigureStreamFilters'
import { ConfigureStreamCommon } from '@/features/stream/ConfigureStreamCommon'

interface ConfigureStreamModalProps {
  className?: string
}

interface CreatedProjectInfo {
  name: string
  logo?: number
}

export interface CreateProjectModalContext {
  onCreate: (project: CreatedProjectInfo) => void
}

const ConfigureStreamModal: FC<ConfigureStreamModalProps> = ({ className }) => {
  const [modal] = useGraph(modalStore, modalStore.key)
  const { localStream, isNew, loading, currentView, updateLocalStream, setCurrentView, handleSubmit } =
    useConfigureStreamModal()
  const isCommonView = currentView === configureStreamViews.common
  const isFiltersView = currentView === configureStreamViews.filters
  const isFragmentsView = currentView === configureStreamViews.fragments

  return (
    <Modal
      className={cn(styles.root, className, { [styles.filters]: isFiltersView, [styles.fragments]: isFragmentsView })}
      isOpen={modal?.name === modalNames.configureStream}
    >
      <ModalContainer
        title={isNew ? 'Create Stream' : 'Configure Stream'}
        titleLegend={currentView !== 'common' ? currentView : undefined}
        footer={
          <>
            <Button mode='secondary' stretched onClick={modalStore.close}>
              Cancel
            </Button>
            <Button stretched loading={loading} onClick={handleSubmit}>
              {isNew ? 'Create' : 'Update'}
            </Button>
          </>
        }
        onBack={currentView !== 'common' ? () => setCurrentView(configureStreamViews.common) : undefined}
      >
        {isFragmentsView && <ConfigureStreamFragments />}
        {isFiltersView && <ConfigureStreamFilters />}
        {isCommonView && (
          <ConfigureStreamCommon
            name={localStream?.name}
            onChangeName={value => updateLocalStream({ name: value })}
            weight={localStream?.weight}
            onChangeWeight={value => updateLocalStream({ weight: value })}
            active={localStream?.active}
            onChangeActive={value => updateLocalStream({ active: value })}
            onEditFilter={() => setCurrentView(configureStreamViews.filters)}
            onEditFragments={() => setCurrentView(configureStreamViews.fragments)}
          />
        )}
      </ModalContainer>
    </Modal>
  )
}

export default ConfigureStreamModal
