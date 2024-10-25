import { useGraph } from '@graph-state/react'
import { modalStore } from '@/shared/store/modal.store'
import { useEffect, useState } from 'react'
import { modalNames } from '@/shared/data'
import { createConstants } from '@fragments/utils'
import isBrowser from '@/shared/utils/isBrowser'

export const configureStreamViews = createConstants('common', 'filters', 'fragments')

export const DEFAULT_LOCAL_STREAM = {
  _type: 'LocalStream',
  id: -1,
  name: '',
  weight: 0,
  active: false,
  filters: [],
  fragments: []
}

if (isBrowser) {
  window.modalStore = modalStore
}

export const useConfigureStreamModal = () => {
  const [modal, updateModal] = useGraph(modalStore, modalStore.key)
  const [localStream, updateLocalStream] = useGraph(modalStore, modal?.context?.localStream)
  const isNew = modal?.name === modalNames.configureStream && !!modal?.context.isNew
  const [currentView, setCurrentView] = useState('common')
  const [filters, setFilters] = useState([])

  useEffect(() => {
    if (!isNew) {
      if (modal?.name === modalNames.configureStream) {
        // setName(modal?.context?.name ?? '')
        // setWeight(modal?.context?.weight ?? 0)
        // setActive(modal?.context?.active ?? false)
      } else {
        //reset
      }
    }
  }, [modal?.name, isNew])

  const handleSubmit = () => {
    modal?.context?.onSubmit?.(modalStore.resolve(localStream))
  }

  return {
    isNew,
    loading: modal?.context?.loading,
    localStream,
    updateLocalStream,
    currentView,
    setCurrentView,
    filters,
    handleSubmit
  }
}
