import { LinkKey } from "@graph-state/core";
import { useContext, useMemo } from "preact/compat";
import { useLayerValue } from "@/shared/hooks/useLayerValue";
import { definition } from "@fragmentsx/definition";
import { FragmentContext } from "@/components/Fragment/FragmentContext";

export const useLayerBackground = (layerKey: LinkKey) => {
  const { manager: fragmentManager } = useContext(FragmentContext);
  const [fillType] = useLayerValue(layerKey, "fillType", fragmentManager);
  const [solidFill, , { isVariable, rawValue, cssVariableValue }] =
    useLayerValue(layerKey, "solidFill", fragmentManager);

  return useMemo(() => {
    let base = {
      background:
        fillType === definition.paintMode.Solid
          ? cssVariableValue
          : "transparent",
    };

    // if (isVariable) {
    //   const { _id } = fragmentManager?.entityOfKey(rawValue);
    //   const defaultValue = fragmentManager?.resolve(rawValue)?.defaultValue;
    //
    //   base = {
    //     // [`--${_id}`]: solidFill,
    //     background: `var(--${_id}, ${defaultValue})`,
    //   };
    // }

    return base;
  }, [fillType, solidFill]);
};
