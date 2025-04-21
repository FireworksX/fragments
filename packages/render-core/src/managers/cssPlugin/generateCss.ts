import { GraphState, Entity } from "@graph-state/core";
import { getNormalizeLayer } from "@/shared/hooks/useNormalizeLayer";
import { hashGenerator } from "@/managers/cssPlugin/hashGenerator";
import { getKey } from "@/shared/helpers/keys";
import { calcPosition } from "@/shared/styles/calcPosition";
import { isValue } from "@fragmentsx/utils";
import { calcSize } from "@/shared/styles/calcSize";
import { calcBackground } from "@/shared/styles/calcBackground";
import { calcDisplay } from "@/shared/styles/calcDisplay";
import { calcLayout } from "@/shared/styles/calcLayout";

export const generateCss = (
  manager: GraphState,
  layerKey: Entity,
  deep = true
) => {
  layerKey = manager.keyOfEntity(layerKey);
  const { rawLayer } = getNormalizeLayer(layerKey, manager);
  const overrideFrom = getKey(rawLayer.overrideFrom);
  const hash = hashGenerator(overrideFrom ?? layerKey);

  const children = deep
    ? rawLayer?.children
        ?.map((child) => generateCss(manager, child, true))
        .flat() ?? []
    : [];

  const css = Object.fromEntries(
    Object.entries({
      ...calcPosition(manager, layerKey),
      width: calcSize(manager, layerKey, "width"),
      height: calcSize(manager, layerKey, "height"),
      ...calcBackground(manager, layerKey),
      ...calcDisplay(manager, layerKey),
      ...calcLayout(manager, layerKey),
    }).filter(([, value]) => isValue(value))
  );

  console.log(layerKey, hash, calcDisplay(manager, layerKey));

  return [
    {
      css: css,
      layerKey,
      hash,
    },
    ...children,
  ];
};
