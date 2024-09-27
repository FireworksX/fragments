import { useContext } from 'react'
import { BuilderContext } from '@/builder/BuilderContext'
import { useBreakpoints } from '@/builder/views/BuilderEditable/widgets/DisplayBreakpoints/hooks/useBreakpoints'
import { to, useSprings } from '@react-spring/web'
import { extractAnimatableValues } from '@/builder/utils/extractAnimatableValues'
import { modalStore } from '@/app/store/modal.store'

export const useLayerHighlightHeaders = () => {
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
