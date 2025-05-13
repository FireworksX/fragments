import { useContext, useMemo } from "preact/compat";
import { LinkKey } from "@graph-state/core";
import { definition } from "@fragmentsx/definition";
import { toPx } from "@fragmentsx/utils";
import { FragmentContext } from "@/components/Fragment/FragmentContext";
import { useLayerValue } from "@/shared/hooks/useLayerValue";

type SizeType = "minWidth" | "minHeight" | "maxWidth" | "maxHeight";

export const processOptionalSize = (value: number, type: any) => {
  if (value === -1) return "";

  if (type === definition.sizing.Fixed) return toPx(value);
  if (type === definition.sizing.Relative) return `${value}%`;

  return "";
};

export const useOptionalSize = (type: SizeType, layerKey: LinkKey) => {
  const { manager: fragmentManager } = useContext(FragmentContext);

  const [value] = useLayerValue(layerKey, type, fragmentManager);
  const [valueType] = useLayerValue(layerKey, `${type}Type`, fragmentManager);

  return useMemo(
    () => processOptionalSize(value, valueType),
    [valueType, value]
  );
};
