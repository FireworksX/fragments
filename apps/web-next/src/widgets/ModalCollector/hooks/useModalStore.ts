import { createContext, useCallback, useMemo, useRef, useState } from 'react'
import { modalNames } from '@/shared/data'
import { ConfigureFeatureFlagVariantContext } from '@/widgets/modals/ConfigureFeatureFlagVariant/ui/ConfigureFeatureFlagVariant'
import { ProjectTreeModalContext } from '@/widgets/modals/ProjectTreeModal/ui/ProjectTreeModal'
import { ConfigureFragmentVariantContext } from '@/widgets/modals/ConfigureFragmentVariant/ui/ConfigureFragmentVariant'
import { nextTick } from '@/shared/utils/nextTick'
import { useForceUpdate } from '@/shared/hooks/useForceUpdate'
import { ConfigureCampaignContext } from '@/widgets/modals/ConfigureCampaign/ui/ConfigureCampaign'
import { GoalViewModalContext } from '@/widgets/modals/GoalViewModal/ui/GoalViewModal'
import { PropertyStringContext } from '@/widgets/modals/PropertyString/ui/PropertyString'
import { PropertyColorContext } from '@/widgets/modals/PropertyColor/ui/PropertyColor'
import { ColorPickerContext } from '@/widgets/modals/ColorPicker/ui/ColorPicker'
import { InviteProjectMemberContext } from '@/widgets/modals/InviteProjectMemberModal/ui/InviteProjectMemberModal'
import { CreateCustomBreakpointContext } from '@/widgets/modals/CreateCustomBreakpoint/ui/CreateCustomBreakpoint'
import { CreateNewFragmentContext } from '@/widgets/modals/CreateNewFragment/ui/CreateNewFragment'

interface ModalContextMap {
  [modalNames.configureFeatureFlagVariant]: ConfigureFeatureFlagVariantContext
  [modalNames.projectTree]: ProjectTreeModalContext
  [modalNames.configureFragmentVariant]: ConfigureFragmentVariantContext
  [modalNames.configureCampaign]: ConfigureCampaignContext
  [modalNames.goalView]: GoalViewModalContext
  [modalNames.propertyString]: PropertyStringContext
  [modalNames.propertyColor]: PropertyColorContext
  [modalNames.colorPicker]: ColorPickerContext
  [modalNames.inviteMember]: InviteProjectMemberContext
  [modalNames.createCustomBreakpoint]: CreateCustomBreakpointContext
  [modalNames.createFragment]: CreateNewFragmentContext
}

type ModalName = keyof typeof modalNames

interface ModalHistoryEntity {
  name: ModalName
  context?: unknown
}

interface OpenModalOptions {
  initial?: boolean
}

export type ModalStore = ReturnType<typeof useModalStore>

export const useModalStore = () => {
  const state = useRef<{ history: ModalHistoryEntity[]; cursor: number }>({
    history: [],
    cursor: 0
  })

  const [updateDep, triggerUpdate] = useForceUpdate()

  const currentModal = useMemo(() => state.current.history.at(state.current.cursor), [updateDep])

  const open = useCallback(
    <TName extends ModalName>(modalName: TName, context?: ModalContextMap[TName], options?: OpenModalOptions) => {
      const currentModal = state.current.history.at(state.current.cursor)
      const indexHistoryPopout = state.current.history.findLastIndex(historyEntity => historyEntity.name === modalName)
      const nextCell = { name: modalName, context }

      if (options?.initial) {
        state.current = {
          history: [nextCell],
          cursor: 0
        }
        return
      }

      if (currentModal?.name !== modalName) {
        if (indexHistoryPopout === -1) {
          const nextHistory = [...state.current.history, nextCell]
          state.current = {
            history: [...state.current.history, nextCell],
            cursor: nextHistory.length - 1
          }
        } else {
          // If pass new context, need update graph
          state.current.cursor = indexHistoryPopout
          const cell = state.current.history.at(indexHistoryPopout)

          if (cell) {
            cell.context = {
              ...cell.context,
              ...(context ?? {})
            }
          }
        }
      }

      triggerUpdate()
    },
    [triggerUpdate]
  )

  const close = useCallback(() => {
    state.current = {
      history: [],
      cursor: 0
    }
    triggerUpdate()
  }, [triggerUpdate])

  const goPrev = useCallback(() => {
    state.current.cursor = state.current.cursor > 1 ? state.current.cursor - 1 : 0
    triggerUpdate()
  }, [triggerUpdate])

  const nextModal = useMemo(() => state.current.history.at(state.current.cursor + 1), [updateDep])

  const prevModal = useMemo(
    () => (state.current.cursor > 0 ? state.current.history.at(state.current.cursor - 1) : null),
    [updateDep]
  )

  const readContext = useCallback(
    <TNAme extends ModalName>(name: TNAme): ModalContextMap[TNAme] =>
      state.current.history.find(el => el.name === name)?.context,
    [updateDep]
  )

  return {
    currentModal,
    readContext,
    history: state.current.history,
    cursor: state.current.cursor,
    open,
    close,
    goPrev,
    nextModal,
    prevModal
  }
}
