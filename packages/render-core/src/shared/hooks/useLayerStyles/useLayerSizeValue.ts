import { useCallback, useContext } from "preact/compat";
import { FragmentContext } from "@/components/Fragment/FragmentContext";
import { InstanceContext } from "@/components/Instance";
import { useRenderTarget } from "@/shared/hooks/useRenderTarget";
import { getParent, isTopLevel } from "@/shared/helpers";
import { useLayerValue } from "@/shared/hooks/useLayerValue";
import { LinkKey } from "@graph-state/core";
import { definition } from "@fragmentsx/definition";

const autoSizes = [definition.sizing.Hug];

export const useLayerSizeValue = (
  layerKey: LinkKey,
  sizeType: "width" | "height"
) => {
  const { manager: fragmentManager } = useContext(FragmentContext);
  const { layerKey: instanceLayerKey } = useContext(InstanceContext);
  const { isDocument, renderTarget } = useRenderTarget(fragmentManager);
  const isTop = isTopLevel(fragmentManager, layerKey);
  const isPartOfInstance = !!instanceLayerKey;
  const layerParent = getParent(fragmentManager, layerKey);
  const layerNode = fragmentManager.resolve(layerKey);

  const [instanceType] = useLayerValue(
    instanceLayerKey,
    `${sizeType}Type`,
    fragmentManager
  );
  const [valueType] = useLayerValue(
    layerKey,
    `${sizeType}Type`,
    fragmentManager
  );
  const growType = sizeType === "width" ? "horizontalGrow" : "verticalGrow";

  return useCallback(
    (value) => {
      if (
        isTop &&
        isDocument &&
        layerParent?.[growType] === definition.fragmentGrowingMode.fill
      ) {
        return "99%";
      }

      if (isTop && isPartOfInstance && !autoSizes.includes(instanceType)) {
        return "100%";
      }
      if (autoSizes.includes(valueType)) {
        return layerNode._type === definition.nodes.Instance
          ? "auto"
          : "min-content";
      }

      if (valueType === definition.sizing.Relative) {
        return `${value}%`;
      }

      if (valueType === definition.sizing.Fill) {
        return `100%`;
      }

      return value;
    },
    [
      isTop,
      isDocument,
      layerParent,
      growType,
      isPartOfInstance,
      instanceType,
      valueType,
      layerNode,
    ]
  );
};
