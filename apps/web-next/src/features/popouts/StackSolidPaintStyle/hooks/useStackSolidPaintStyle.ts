import { useGraph } from '@graph-state/react'
import { POPOUT_TYPE, popoutsStore } from '@/shared/store/popouts.store'
import { ElementRef, useContext, useEffect, useRef, useState } from 'react'
import { useDisplayColor } from '@/shared/hooks/fragmentBuilder/useDisplayColor'
import { popoutNames } from '@/shared/data'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'

export const useStackSolidPaintStyle = () => {
  const { documentManager } = useBuilderDocument()
  const [popout] = useGraph(popoutsStore, `${POPOUT_TYPE}:${popoutNames.stackSolidPaintStyle}`)
  const context = popout?.context
  const [solidStyleGraph] = useGraph(documentManager, context?.link)
  const nameRef = useRef<ElementRef<'input'>>()

  useEffect(() => {
    if (context) {
      setTimeout(() => nameRef.current?.focus(), 250)
    }
  }, [context])

  return {
    nameRef,
    name: solidStyleGraph?.name,
    setName: solidStyleGraph?.rename,
    color$: solidStyleGraph?.color,
    updateColor: solidStyleGraph?.update
  }
}
