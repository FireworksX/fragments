import { useBuilder } from '@/shared/hooks/fragmentBuilder/useBuilder'
import { useGlobalManager } from '@/shared/hooks/fragmentBuilder/useBuilderGlobalContext'
import { useEffect, useRef, useState } from 'react'

export const useBuilderDocument = () => {
  const { currentFragmentId } = useBuilder()
  const { getFragmentManager, globalManager, loadFragmentManager } = useGlobalManager()
  const manager = getFragmentManager(currentFragmentId)

  useEffect(() => {
    loadFragmentManager(currentFragmentId)
  }, [currentFragmentId])

  return {
    documentManager: manager,
    globalManager
  }
}
