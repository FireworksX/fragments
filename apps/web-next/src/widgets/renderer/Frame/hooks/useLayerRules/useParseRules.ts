import { useParseLayoutRules } from './useParseLayoutRules'
import { useParseStyleRules } from './useParseStylesRules'
import { useParseSizeRules } from './useParseSizeRules'
import { useParseLinkRules } from './useParseLinkRules'
import { useParseTextRules } from './useParseTextRules'
import { useParseChildren } from './useParseChildren'
import { useEffectsRules } from './useEffectsRules'
import { useParsePositionRules } from './useParsePositionRules'
import { useParseCssRules } from './useParseCssRules'
import { Entity } from '@graph-state/core'

export const useParseRules = (layerEntity: Entity) => {
  // const layoutRules = useParseLayoutRules(layerEntity)
  // const styleRules = useParseStyleRules(layerEntity)
  // const sizeRules = useParseSizeRules(layerEntity)
  const positionRules = useParsePositionRules(layerEntity)
  // const effects = useEffectsRules(layerEntity)
  // const children = useParseChildren(layerEntity)
  const cssRules = useParseCssRules(layerEntity)
  // const linkAttrs = useParseLinkRules(layerEntity)

  return {
    cssRules: {
      // ...sizeRules,
      // ...layoutRules,
      // ...styleRules,
      ...positionRules

      // ...layoutRules,
      // ...styleRules,
      // ...positionRules,
      // ...effects,
      // ...cssRules
    }
    // attrs: {
    //   ...linkAttrs
    // }
    // children: children
  }
}
