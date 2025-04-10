import { LinkKey, Plugin } from '@graph-state/core'
import { SpringValue } from '@react-spring/web'
import { findRefNode } from '@/shared/utils/findRefNode'

export const canvasPlugin: Plugin = state => {
  const canvasGraph = {
    _type: 'Canvas',
    _id: 'root',
    x: new SpringValue(0),
    y: new SpringValue(0),
    scale: new SpringValue(1),
    focusLayer: null,
    hoverLayer: null,
    draggingLayer: new SpringValue(''), // LinkKey слоя который сейчас перетаскиваем
    isDragging: false, // Перетаскиваем ли сейчас какой-нибудь элемент
    isMoving: false, // Двигаем ли сейчас canvas
    isResizing: new SpringValue(false) // Изменяем ли сейчас размер
  }
  const canvasGraphKey = state.keyOfEntity(canvasGraph)

  state.mutate(state.key, {
    canvas: canvasGraph
  })

  state.$canvas = {
    key: canvasGraphKey,
    setDragging(value: boolean, layerLink?: LinkKey) {
      state.mutate(canvasGraphKey, {
        isDragging: value
      })
    },
    setMoving(value: boolean) {
      state.mutate(canvasGraphKey, {
        isMoving: value
      })
    },
    setFocus(layerLink: LinkKey) {
      state.mutate(canvasGraphKey, {
        focusLayer: layerLink
      })
    },
    setResizing(value: boolean) {
      state.mutate(canvasGraphKey, { isResizing: value })
    },
    setHoverLayer(layerLink: LinkKey) {
      // state.mutate(canvasGraphKey, { hoverLayer: layerLink })
    },
    toCenter() {
      const x$ = state.resolve(canvasGraphKey)?.x
      const y$ = state.resolve(canvasGraphKey)?.y
      const bound = state.resolve(canvasGraphKey)?.bound

      if (x$ && y$) {
        x$.start(bound[0] + bound[2] / 2)
        y$.start(bound[1] + bound[3] / 2)
      }
    },
    updateBound(x, y, width, height) {
      // state.mutate(state.key, prev => ({ ...prev, bounds: [x, y, width, height] }), { replace: true })
    },
    scrollAndZoomIntoView(node: LinkKey) {
      const [, , width, height] = state.resolve(canvasGraphKey).bounds
      const { x: x$, y: y$ } = state.resolve(canvasGraphKey) || {}

      const rect = findRefNode(node)?.getBoundingClientRect()

      if (rect) {
        const x = width / 2 - rect.width / 2
        const y = height / 2 - rect.height / 2

        x$.start(x)
        y$.start(y)
      }
    }
  }
}
