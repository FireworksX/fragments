import { useParseLayoutRules } from "./useParseLayoutRules.ts";
import { useParseStyleRules } from "./useParseStylesRules.ts";
import { useParseSizeRules } from "./useParseSizeRules.ts";
import { useParseLinkRules } from "./useParseLinkRules.ts";
import { useParseTextRules } from "./useParseTextRules.ts";
import { useParseChildren } from "./useParseChildren.ts";
import { useEffectsRules } from "./useEffectsRules.ts";
import { useParsePositionRules } from "./useParsePositionRules.ts";
import { useParseCssRules } from "./useParseCssRules.ts";
import { Entity } from "@graph-state/core";

export const useParseRules = (layerEntity: Entity) => {
  const layoutRules = useParseLayoutRules(layerEntity);
  const styleRules = useParseStyleRules(layerEntity);
  const sizeRules = useParseSizeRules(layerEntity);
  const positionRules = useParsePositionRules(layerEntity);
  const textContent = useParseTextRules(layerEntity);
  const effects = useEffectsRules(layerEntity);
  const children = useParseChildren(layerEntity);
  const cssRules = useParseCssRules(layerEntity);

  const linkAttrs = useParseLinkRules(layerEntity);

  return {
    cssRules: {
      ...sizeRules,
      ...layoutRules,
      ...styleRules,
      ...positionRules,
      ...effects,
      ...cssRules,
    },
    attrs: {
      ...linkAttrs,
    },
    textContent,
    children: children,
  };
};
