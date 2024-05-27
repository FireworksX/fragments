import { ComponentType, useCallback, useEffect, useMemo } from 'react'
import { useSpringRef, useTransition } from '@react-spring/web'
import { useStore } from '@nanostores/react'
// import { $closePopout, $currentPopout, $goPrevPopout, $prevPopout } from '../../../store/popoutStore'
// import { $nextPopout } from '../../../store/popoutStore/computed/$nextPopout'

export type StackPanel<TProps = any> = ComponentType<TProps & { name: string; title: string }>

interface Options {
  panels: StackPanel[]
  onPrev?: () => void
  onClose?: () => void
}

export const useStackCollector = ({ panels, onPrev, onClose }: Options) => {
  const currentPopout = null //useStore($currentPopout)
  const activePanel = currentPopout?.name || ''
  const prevPopout = null //useStore($prevPopout)
  const nextPopout = null //useStore($nextPopout)
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
    // $goPrevPopout()
    if (onPrev) onPrev()
  }

  const proxyCloseHandler = () => {
    // $closePopout()
    if (onClose) onClose()
  }

  return {
    title: currentPanel?.props?.title,
    activePanel,
    getPanel,
    currentPanel,
    panelTransition,
    proxyCloseHandler,
    proxyPrevHandler,
    hasPrev: !!prevPopout
  }
}
