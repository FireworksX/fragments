import { ComponentType, useCallback, useEffect, useMemo } from 'react'
import { useSpringRef, useTransition } from '@react-spring/web'
import { useGraph } from '@graph-state/react'
import { popoutsStore } from '@/shared/store/popouts.store'

export type StackPanel<TProps = any> = ComponentType<TProps & { name: string; title: string }>

interface Options {
  panels: StackPanel[]
  onPrev?: () => void
  onClose?: () => void
}

export const useStackCollector = ({ panels, onPrev, onClose }: Options) => {
  const [{ history, cursor }] = useGraph(popoutsStore, popoutsStore.key)
  const [currentPopout] = useGraph(popoutsStore, history.at(cursor) ?? 'nil')
  const activePanel = currentPopout?.name || ''
  const prevPopout = popoutsStore.prevPopout()
  const nextPopout = popoutsStore.nextPopout()
  const currentPanel = useMemo(() => panels.find(comp => comp?.props?.name === activePanel), [activePanel, panels])
  const transitionRef = useSpringRef()
  const isBack = !!nextPopout //activePanel === prevPopout?.name || !prevPopout
  const isInitial = !prevPopout && !nextPopout

  const panelTransition = useTransition(activePanel, {
    ref: transitionRef,
    from: {
      opacity: isInitial ? 1 : 0,
      transform: isInitial ? 'translate3d(0,0,0)' : isBack ? 'translate3d(-100%,0,0)' : 'translate3d(100%,0,0)',
      position: 'absolute'
    },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)', position: 'static' },
    leave: {
      opacity: 0,
      transform: isBack ? 'translate3d(50% ,0,0)' : 'translate3d(-50%,0,0)',
      position: 'absolute'
    },
    config: {
      duration: 200
    }
  })

  useEffect(() => {
    transitionRef.start()
  }, [activePanel])

  const getPanel = useCallback((name: string) => panels.find(comp => comp?.props?.name === name), [panels])

  const proxyPrevHandler = () => {
    popoutsStore.goPrev()
    if (onPrev) onPrev()
  }

  const proxyCloseHandler = () => {
    if (currentPopout) {
      popoutsStore.close()
      if (onClose) onClose()
    }
  }

  return {
    title: currentPanel?.props?.title,
    description: currentPopout?.description,
    activePanel,
    getPanel,
    currentPanel,
    panelTransition,
    proxyCloseHandler,
    proxyPrevHandler,
    hasPrev: !!prevPopout
  }
}
