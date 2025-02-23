import { useEffect } from "react";
import { LinkKey } from "@graph-state/core";
import { useSpringValue } from "@react-spring/web";
import { useLayerVariableValue } from "@/shared/hooks/useLayerVariableValue.ts";

export const useLayerStyleValue = (layerKey: LinkKey, fieldKey: string) => {
  const [value] = useLayerVariableValue(layerKey, fieldKey);
  const value$ = useSpringValue(value);

  useEffect(() => {
    value$.set(value);
  }, [value]);

  return value$;
};
