import { LinkKey } from '@graph-state/core'
import { useCallback, useEffect, useMemo } from 'react'
import { to, useSpringValue } from '@react-spring/web'
import { useBuilderCanvas } from '@/shared/hooks/fragmentBuilder/useBuilderCanvas'
import { animatableValue } from '@/shared/utils/animatableValue'
import { useWaitForElement } from '@/shared/hooks/useWaitForElement'
import { useBuilderCanvasField } from '@/shared/hooks/fragmentBuilder/useBuilderCanvasField'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { useUpdateEffect } from 'react-use'
import { nextTick } from '@/shared/utils/nextTick'
import { watchInlineStyleChange } from '@/shared/utils/watchInlineStyleChange'
import { useDomNodeGeometry } from '@/shared/hooks/useDomNodeGeometry'

export const useLayerGeometry = (layerKey: LinkKey | null) => {
  const { runCalc, ...geometry } = useDomNodeGeometry(`[data-key='${layerKey}']`, `[data-highlight-root]`)
  const [content] = useLayerValue('content', layerKey)

  useUpdateEffect(() => {
    runCalc()
  }, [content, runCalc])

  return geometry
}
