import { use, useEffect } from "react";
import { LinkKey } from "@graph-state/core";
import { useSpringValue } from "@react-spring/web";
import { useLayerVariableValue } from "@/shared/hooks/useLayerVariableValue.ts";
import { FragmentContext } from "@/components/Fragment/FragmentContext.tsx";
import { useGraphEffect } from "@graph-state/react";
import { pick } from "@fragments/utils";

export const useLayerStyleValue = (layerKey: LinkKey, fieldKey: string) => {
  const [value] = useLayerVariableValue(layerKey, fieldKey);
  const value$ = useSpringValue(value);

  // useGraphEffect(
  //   manager,
  //   "Spring:root",
  //   (value) => {
  //     value$.start(value[fieldKey]);
  //   },
  //   {
  //     selector: (graph) => (graph ? pick(graph, fieldKey) : graph),
  //   }
  // );

  useEffect(() => {
    value$.start(value);
  }, [value]);

  return value$;
};
