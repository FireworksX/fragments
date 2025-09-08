import { useEffect, useRef } from 'react'
import { builderCanvasMode } from '@/shared/constants/builderConstants'
import { useBuilderCanvasField } from '@/shared/hooks/fragmentBuilder/useBuilderCanvasField'
import { useKey, useKeyPress } from 'react-use'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'

export const useCanvasKeyboard = () => {
  const [canvasMode, setCanvasMode] = useBuilderCanvasField('canvasMode')
  const [, setTop, { value$: top$ }] = useLayerValue('top')
  const [, setLeft, { value$: left$ }] = useLayerValue('left')

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Проверяем, находится ли фокус в input или textarea
      const activeElement = document.activeElement
      const isInputFocused =
        activeElement?.tagName === 'INPUT' || activeElement?.tagName === 'TEXTAREA' || activeElement?.isContentEditable

      // Если фокус в поле ввода - пропускаем обработку
      if (isInputFocused) {
        return
      }

      if (e.code === 'Space' && canvasMode !== builderCanvasMode.pan && canvasMode !== builderCanvasMode.panning) {
        setCanvasMode(builderCanvasMode.pan)
      }

      if (e.code.includes('Arrow')) {
        e.preventDefault()
        const valueStep = e.ctrlKey || e.metaKey || e.shiftKey ? 10 : 1

        if (e.code === 'ArrowUp') {
          setTop((top$?.get() ?? 0) + valueStep * -1)
        }
        if (e.code === 'ArrowDown') {
          setTop((top$?.get() ?? 0) + valueStep)
        }

        if (e.code === 'ArrowLeft') {
          setLeft((left$?.get() ?? 0) + valueStep * -1)
        }
        if (e.code === 'ArrowRight') {
          setLeft((left$?.get() ?? 0) + valueStep)
        }
      }
    }
    const up = (e: KeyboardEvent) => {
      if (e.code === 'Space' && (canvasMode === builderCanvasMode.pan || canvasMode === builderCanvasMode.panning)) {
        setCanvasMode(builderCanvasMode.select)
      }
    }

    document?.addEventListener('keydown', down)
    document?.addEventListener('keyup', up)
    return () => {
      document?.removeEventListener('keydown', down)
      document?.removeEventListener('keyup', up)
    }
  }, [canvasMode, top$, left$])
}
