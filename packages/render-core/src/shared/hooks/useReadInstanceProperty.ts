import { LinkKey } from "@graph-state/core";
import { use } from "react";
import { InstanceContext } from "@/components/Instance";
import { useLayer } from "@/shared/hooks/useLayer.ts";
import { FragmentContext } from "@/components/Fragment/FragmentContext.tsx";
import { useGraph } from "@graph-state/react";
import { pick } from "@fragments/utils";

export const useReadInstanceProperty = (propertyKey: LinkKey) => {
  const { manager: fragmentManager } = use(FragmentContext);
  const { props, innerManager, layerKey } = use(InstanceContext);
  const resultManager = innerManager ?? fragmentManager;
  const { _id: propertyId } = resultManager?.entityOfKey(propertyKey) ?? {};
  const { layer: propertyLayer } = useLayer(propertyKey, resultManager);

  useGraph(!layerKey ? fragmentManager : null, propertyKey, {
    selector: (graph) => (graph ? pick(graph, "defaultValue") : graph),
  });

  const currentValue = props?.[propertyId] ?? null;
  const required = propertyLayer?.required ?? false;
  const defaultValue = propertyLayer?.defaultValue ?? null;
  const resultValue = required ? currentValue : currentValue ?? defaultValue;

  return {
    value: resultValue,
    propertyLayer,
  };
};
