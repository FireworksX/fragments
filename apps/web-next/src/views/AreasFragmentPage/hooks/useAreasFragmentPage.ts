import { modalStore } from '@/shared/store/modal.store'
import { modalNames } from '@/shared/data'
import { useState } from 'react'

export const useAreasFragmentPage = () => {
  const [fragmentId, setFragmentId] = useState()

  const handleClickConnect = () => {
    modalStore.open(modalNames.projectTree, {
      onClick: item => {
        setFragmentId(item.id)
        // connectFragment(item.id)
        modalStore.close()
      }
    })
  }

  return {
    fragmentId,
    handleClickConnect
  }
}
