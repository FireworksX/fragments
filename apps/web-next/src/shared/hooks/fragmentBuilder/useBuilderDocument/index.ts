import { useFragmentManager } from '@fragmentsx/render-suite'
import { useBuilder } from '@/shared/hooks/fragmentBuilder/useBuilder'
import { useGlobalManager } from '@fragmentsx/render-suite'
import { builderToasts } from '@/shared/data'
import { useToast } from '@/widgets/Toast/hooks/useToast'
import { makeSnapshot } from '@fragmentsx/render-core'
import { pick, promiseWaiter } from '@fragmentsx/utils'
import { useUpdateFragmentDocumentMutation } from './queries/UpdateFragmentDocument.generated'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useGraph, useGraphEffect } from '@graph-state/react'

export const useBuilderDocument = () => {
  const { open, close, setContext } = useToast()
  const { currentFragmentId, isSaving, savingState, setSavingState, setSaving } = useBuilder()
  const { manager: globalManager } = useGlobalManager()
  const { manager, loading } = useFragmentManager(currentFragmentId)

  const [updateFragment, { loading: fetchingUpdate }] = useUpdateFragmentDocumentMutation({
    variables: {
      fragmentSlug: +currentFragmentId
    }
  })

  const saveFragment = useCallback(async () => {
    if (fetchingUpdate) return

    setSaving(true)

    // open(builderToasts.saving)
    const snapshot = makeSnapshot(globalManager, currentFragmentId)
    //
    // const linkedFragmentsIds = (documentManager.resolve(documentManager?.$fragment?.linkerGraphKey)?.fragments ?? [])
    //   .map(manager => +documentManager.entityOfKey(manager?.key)?._id)
    //   .filter(v => !isNaN(v))

    if (snapshot) {
      await promiseWaiter(300)
      await updateFragment({
        variables: {
          fragmentSlug: +currentFragmentId,
          document: snapshot.document,
          linkedFragments: snapshot.linkedFragments,
          linkedGoals: snapshot.linkedGoals
        }
      })
    }

    setSavingState('success')
    // setContext({ status: 'success' })
    await promiseWaiter(1000)

    setSavingState(null)

    close()
    setSaving(false)
  }, [])

  return {
    documentManager: manager,
    loading,
    saveFragment,
    savingState,
    isSaving,
    undo: manager?.$history?.undo,
    redo: manager?.$history?.redo
  }
}
