import { GraphState, LinkKey } from "@graph-state/core";
import { useGraph } from "@graph-state/react";
import { useContext, useMemo } from "react";
import { FragmentContext } from "@/components/Fragment/FragmentContext.tsx";
import { getOverrider } from "@/shared/helpers/getOverrider.ts";
import { parseRawLayer } from "@/lib/parseRawLayer.ts";
import { getLayerSchema } from "@/lib/getLayerSchema.ts";

export const useLayerValue = (
  layerKey: LinkKey,
  fieldKey: string,
  manager: GraphState
) => {
  const [layerData, updateLayerData] = useGraph(manager, layerKey);

  const { overrider, schema } = useMemo(() => {
    if (!manager) {
      return {
        overrider: null,
        schema: null,
      };
    }
    const overrider = getOverrider(layerKey, manager);
    const schema = getLayerSchema(manager?.entityOfKey?.(layerKey));

    return {
      overrider,
      schema,
    };
  }, [layerKey, manager]);

  const parsedLayer =
    schema && layerData
      ? parseRawLayer(schema, layerData, {
          overrideTarget: overrider,
        })
      : null;

  return [
    parsedLayer?.[fieldKey],
    (value) => updateLayerData({ [fieldKey]: value }),
  ];
};
