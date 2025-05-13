import { Entity, GraphState } from "@graph-state/core";
import { toCSS } from "./toCSS";
import { compareRules } from "./compareRules";
import { getKey, hashGenerator } from "@fragmentsx/utils";

export const makeCss = (state: GraphState) => (entity: Entity) => {
  const cache = state.$styleSheet?.cache;
  const layerKey = state.keyOfEntity(entity);
  const cacheLayer = cache.get(layerKey);
  const isPrimary = !cacheLayer?.layer?.overrideFrom;
  const layerHash = hashGenerator(
    isPrimary ? layerKey : getKey(cacheLayer?.layer?.overrideFrom)
  );

  const layerCss = cacheLayer?.styles;
  const overriderLayerCss =
    cache.get(getKey(cacheLayer?.layer?.overrideFrom))?.styles ?? {};

  const resultCssRules = compareRules(overriderLayerCss, layerCss);

  return {
    hash: layerHash,
    css: toCSS(resultCssRules),
  };
};
