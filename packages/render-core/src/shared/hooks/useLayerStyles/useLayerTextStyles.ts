import { LinkKey } from "@graph-state/core";
import { useContext, useMemo } from "preact/compat";
import { isTopLevel } from "@/shared/helpers";
import { InstanceContext } from "@/components/Instance";
import { useLayerValue } from "@/shared/hooks/useLayerValue";
import { FragmentContext } from "@/components/Fragment/FragmentContext";
import { useRenderTarget } from "@/shared/hooks/useRenderTarget";
import { definition } from "@fragmentsx/definition";
import { omit, toPx } from "@fragmentsx/utils";

export const useLayerTextStyles = (layerKey: LinkKey) => {
  const { manager: fragmentManager } = useContext(FragmentContext);
  const [attributes] = useLayerValue(layerKey, "attributes", fragmentManager);
  const [color] = useLayerValue(layerKey, "attributes.color", fragmentManager);
  const cleanAttributes = omit(attributes, "_id", "_type");

  return {
    ...cleanAttributes,
    color,
  };
};
