import { useContext } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { to, useSprings } from '@react-spring/web'
import { modalStore } from '@/shared/store/modal.store'
import { useBreakpoints } from '@/shared/hooks/fragmentBuilder/useBreakpoints'

export const useBuilderHighlightHeaders = () => {
  const { documentManager } = useContext(BuilderContext)
  const { breakpointValues, addBreakpoint } = useBreakpoints()

  const [breakpointSprings, breakpointApi] = useSprings(breakpointValues.length, i => {
    const rect = breakpointValues.at(i)?.absoluteRect?.()

    return {
      width: to(rect, v => v.width),
      x: to(rect, v => v.x),
      y: '-100%'
    }
  })

  const handleNewBreakpoint = (name, width) => {
    addBreakpoint(name, width)
  }

  const handleCustomBreakpoint = () => {
    modalStore.open('createCustomBreakpoint', {
      onAdd: (name, width) => {
        addBreakpoint(name, width)
        close()
      }
    })
  }

  return {
    activeWidths: breakpointValues.map(b => b.width),
    breakpoints: breakpointValues.map((breakpoint, index) => ({
      style: breakpointSprings[index],
      breakpoint
    })),
    handleNewBreakpoint,
    handleCustomBreakpoint
  }
}
