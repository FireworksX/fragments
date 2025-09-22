import { createContext, useCallback, useMemo, useRef, useState } from 'react'
import { modalNames, popoutNames } from '@/shared/data'
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
import { StackSolidPaintStyleContext } from '@/features/popouts/StackSolidPaintStyle/ui/StackSolidPaintStyle'
import { StackStringPropertyContext } from '@/features/popouts/StackStringProperty/ui/StackStringProperty'
import { StackArrayValueContext } from '@/features/popouts/StackArrayValue/ui/StackArrayValue'
import { StackFragmentPropsContext } from '@/features/popouts/StackFragmentProps/ui/StackFragmentProps'
import { StackColorPropertyContext } from '@/features/popouts/StackColorProperty/ui/StackColorProperty'
import { StackPanelColorPickerContext } from '@/features/popouts/StackPanelColorPicker/ui/StackPanelColorPicker'
import { StackArrayPropertyContext } from '@/features/popouts/StackArrayProperty/ui/StackArrayProperty'
import { StackObjectValueContext } from '@/features/popouts/StackObjectValue/ui/StackObjectValue'
import { StackNumberPropertyContext } from '@/features/popouts/StackNumberProperty/ui/StackNumberProperty'
import { StackBooleanPropertyContext } from '@/features/popouts/StackBooleanProperty/ui/StackBooleanProperty'
import { StackObjectPropertyContext } from '@/features/popouts/StackObjectProperty/ui/StackObjectProperty'
import { StackLinkPropertyContext } from '@/features/popouts/StackLinkProperty/ui/StackLinkProperty'
import { StackInteractionContext } from '@/features/popouts/StackInteraction/ui/StackInteraction'
import { StackEnumPropertyContext } from '@/features/popouts/StackEnumProperty/ui/StackEnumProperty'
import { StackCreateGoalContext } from '@/features/popouts/StackCreateGoal/ui/StackCreateGoal'
import { StackEventPropertyContext } from '@/features/popouts/StackEventProperty/ui/StackEventProperty'
import { StackGoalsContext } from '@/features/popouts/StackGoals/ui/StackGoals'
import { StackImagePickerContext } from '@/features/popouts/StackImagePicker/ui/StackImagePicker'
import { StackImagePropertyContext } from '@/features/popouts/StackImageProperty/ui/StackImageProperty'

interface StackContextMap {
  [popoutNames.stackSolidPaintStyle]: StackSolidPaintStyleContext
  [popoutNames.stackStringProperty]: StackStringPropertyContext
  [popoutNames.stackArrayValue]: StackArrayValueContext
  [popoutNames.stackFragmentProps]: StackFragmentPropsContext
  [popoutNames.stackColorProperty]: StackColorPropertyContext
  [popoutNames.colorPicker]: StackPanelColorPickerContext
  [popoutNames.stackArrayProperty]: StackArrayPropertyContext
  [popoutNames.stackObjectValue]: StackObjectValueContext
  [popoutNames.stackNumberProperty]: StackNumberPropertyContext
  [popoutNames.stackBooleanProperty]: StackBooleanPropertyContext
  [popoutNames.stackObjectProperty]: StackObjectPropertyContext
  [popoutNames.stackLinkProperty]: StackLinkPropertyContext
  [popoutNames.stackInteraction]: StackInteractionContext
  [popoutNames.stackEnumProperty]: StackEnumPropertyContext
  [popoutNames.stackCreateGoal]: StackCreateGoalContext
  [popoutNames.stackEventProperty]: StackEventPropertyContext
  [popoutNames.stackGoals]: StackGoalsContext
  [popoutNames.imagePicker]: StackImagePickerContext
  [popoutNames.stackImageProperty]: StackImagePropertyContext
  // Остальные Stack компоненты будут добавлены после рефакторинга
}

type StackName = keyof typeof popoutNames

interface StackHistoryEntity {
  name: StackName
  position: OpenStackOptions['position']
  initial: boolean
  context?: unknown
}

interface OpenStackOptions {
  initial?: boolean
  position?: 'left' | 'right'
}

export type StackStore = ReturnType<typeof useStackStore>

export const useStackStore = () => {
  const state = useRef<{ history: StackHistoryEntity[]; cursor: number }>({
    history: [],
    cursor: 0
  })

  const [updateDep, triggerUpdate] = useForceUpdate()

  const currentStack = useMemo(() => state.current.history.at(state.current.cursor), [updateDep])

  const open = useCallback(
    <TName extends StackName>(name: TName, context?: StackContextMap[TName], options?: OpenStackOptions) => {
      const resultInitial = options?.initial ?? history.length === 0
      const resultPosition = resultInitial
        ? options?.position || 'right'
        : currentStack?.position || options?.position || 'right'
      const historyStack = state.current.history.at(state.current.cursor)
      const indexHistory = state.current.history.findLastIndex(historyEntity => historyEntity.name === name)
      const nextCell = { name, context, position: resultPosition, initial: resultInitial }

      if (resultInitial) {
        state.current = {
          history: [nextCell],
          cursor: 0
        }
        triggerUpdate()
        return
      }

      if (historyStack?.name !== name) {
        if (indexHistory === -1) {
          const nextHistory = [...state.current.history, nextCell]
          state.current = {
            history: [...state.current.history, nextCell],
            cursor: nextHistory.length - 1
          }
        } else {
          // If pass new context, need update graph
          state.current.cursor = indexHistory
          const cell = state.current.history.at(indexHistory)

          if (cell) {
            cell.context = context ?? {}
            // cell.context = {
            //   ...cell.context,
            //   ...(context ?? {})
            // }
          }
        }
      }

      triggerUpdate()
    },
    [triggerUpdate, currentStack]
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

  const nextStack = useMemo(() => state.current.history.at(state.current.cursor + 1), [updateDep])

  const prevStack = useMemo(
    () => (state.current.cursor > 0 ? state.current.history.at(state.current.cursor - 1) : null),
    [updateDep]
  )

  const readContext = useCallback(
    <TNAme extends StackName>(name: TNAme): StackContextMap[TNAme] =>
      state.current.history.find(el => el.name === name)?.context,
    [updateDep]
  )

  return {
    currentStack,
    readContext,
    history: state.current.history,
    cursor: state.current.cursor,
    open,
    close,
    goPrev,
    nextStack,
    prevStack
  }
}
