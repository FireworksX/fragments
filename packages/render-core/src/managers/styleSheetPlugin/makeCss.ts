import { Entity, GraphState } from "@graph-state/core";
import { hashGenerator } from "@/shared/helpers/hashGenerator";
import { getKey } from "@/shared/helpers/keys";
import { compareRules } from "@/managers/styleSheetPlugin/compareRules";
import { toCSS } from "@/managers/styleSheetPlugin/toCSS";

export const makeCss = (state: GraphState) => (entity: Entity) => {
  const cache = state.styleSheetCache;
  const layerKey = state.keyOfEntity(entity);
  const cacheLayer = cache.get(layerKey);
  const isPrimary = !cacheLayer?.layer?.overrideFrom;
  const layerHash = hashGenerator(
    isPrimary ? layerKey : getKey(cacheLayer?.layer?.overrideFrom)
  );

  const layerCss = cacheLayer?.styles;
  const overriderLayerCss =
    state.styleSheetCache.get(getKey(cacheLayer?.layer?.overrideFrom))
      ?.styles ?? {};

  const resultCssRules = compareRules(overriderLayerCss, layerCss);

  return {
    hash: layerHash,
    css: toCSS(resultCssRules),
  };
};
