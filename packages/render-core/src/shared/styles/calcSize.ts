import { definition } from "@fragmentsx/definition";
import { GraphState, LinkKey } from "@graph-state/core";
import { useCallback, useContext } from "preact/compat";
import { FragmentContext } from "@/components/Fragment/FragmentContext";
import { InstanceContext } from "@/components/Instance";
import { useRenderTarget } from "@/shared/hooks/useRenderTarget";
import { getParent, isTopLevel } from "@/shared/helpers";
import { useLayerValue } from "@/shared/hooks/useLayerValue";
import { isValue, toPx } from "@fragmentsx/utils";

interface CalcSizeOptions {
  sizeType: "width" | "height";
  value: unknown;
  valueType: keyof typeof definition.sizing;
  isTop: boolean;
  isDocument: boolean;
  isPartOfInstance: boolean;
  layerType: keyof typeof definition.nodes;
  layerParent: unknown;
}

const autoSizes = [definition.sizing.Hug];

export const calcSize = (
  manager: GraphState,
  layerKey: LinkKey,
  sizeType: "width" | "height"
) => {
  const layer = manager.resolve(layerKey);
  const value = layer[sizeType];
  const valueType = layer[`${sizeType}Type`];

  // const { layerKey: instanceLayerKey } = useContext(InstanceContext);
  // const { isDocument, renderTarget } = useRenderTarget(manager);
  const isTop = isTopLevel(manager, layerKey);
  // const isPartOfInstance = !!instanceLayerKey;
  const layerParent = getParent(manager, layerKey);

  // const [instanceType] = useLayerValue(
  //   instanceLayerKey,
  //   `${sizeType}Type`,
  //   fragmentManager
  // );
  // const [valueType] = useLayerValue(
  //   layerKey,
  //   `${sizeType}Type`,
  //   fragmentManager
  // );
  const growType = sizeType === "width" ? "horizontalGrow" : "verticalGrow";

  if (
    isTop &&
    layerParent?.[growType] === definition.fragmentGrowingMode.fill
  ) {
    return "100%";
  }

  // if (isTop && isPartOfInstance && !autoSizes.includes(instanceType)) {
  //   return "100%";
  // }
  if (autoSizes.includes(valueType)) {
    return layer._type === definition.nodes.Instance ? "auto" : "min-content";
  }

  if (valueType === definition.sizing.Relative) {
    return `${value}%`;
  }

  if (valueType === definition.sizing.Fill) {
    return `100%`;
  }

  return isValue(value) ? toPx(value) : null;
};
