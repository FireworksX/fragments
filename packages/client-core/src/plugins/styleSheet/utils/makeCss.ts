import { Entity, GraphState, LinkKey } from "@graph-state/core";
import { toCSS } from "./toCSS";
import { compareRules, CSSRules } from "./compareRules";
import { getKey, hashGenerator } from "@fragmentsx/utils";
import type { CSSBlock } from "./buildCssBlock";
import { LayerResolver, LayerStyles } from "../fragment";

export const makeCss =
  (styles: LayerStyles, layerResolver: LayerResolver) =>
  (layerKey: LinkKey): CSSBlock => {
    const cacheLayer = layerResolver(layerKey);
    const isPrimary = !cacheLayer?.overrideFrom;
    const overrideFromKey = cacheLayer?.overrideFrom
      ? String(getKey(cacheLayer?.overrideFrom))
      : undefined;
    const layerHash = hashGenerator(isPrimary ? layerKey : overrideFromKey!);

    const layerCss = styles?.[layerKey];
    const overriderLayerCss = overrideFromKey
      ? styles?.[overrideFromKey] ?? {}
      : {};

    const resultCssRules = compareRules(overriderLayerCss, layerCss);
    const cssOverride = cacheLayer?.cssOverride ?? "";

    return {
      hash: layerHash,
      css: cssOverride + toCSS(resultCssRules),
    };
  };
