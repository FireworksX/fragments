import { LinkKey } from "@graph-state/core";
import { useContext, useMemo } from "preact/compat";
import { useLayerValue } from "@/shared/hooks/useLayerValue";
import { definition } from "@fragmentsx/definition";
import { FragmentContext } from "@/components/Fragment/FragmentContext";

export const useLayerBackground = (layerKey: LinkKey) => {
  const { manager: fragmentManager } = useContext(FragmentContext);
  const [fillType] = useLayerValue(layerKey, "fillType", fragmentManager);
  const [, , { cssVariableValue: cssSolidFill }] = useLayerValue(
    layerKey,
    "solidFill",
    fragmentManager
  );
  const [, , { cssVariableValue: cssImageFill }] = useLayerValue(
    layerKey,
    "imageFill",
    fragmentManager
  );
  const [, , { cssVariableValue: cssImageSize }] = useLayerValue(
    layerKey,
    "imageSize",
    fragmentManager
  );

  return useMemo(() => {
    if (fillType === definition.paintMode.Solid) {
      return {
        background: cssSolidFill,
      };
    }
    if (fillType === definition.paintMode.Image && cssImageFill) {
      const sizeMap = {
        [definition.imagePaintScaleModes.Fill]: "cover",
        [definition.imagePaintScaleModes.Fit]: "contain",
      };

      return {
        background: `url(${cssImageFill})`,
        backgroundSize: sizeMap[cssImageSize],
      };
    }

    return {
      background: "transparent",
    };
    // let base = {
    //   background:
    //     fillType === definition.paintMode.Solid
    //       ? cssVariableValue
    //       : "transparent",
    // };

    // if (isVariable) {
    //   const { _id } = fragmentManager?.entityOfKey(rawValue);
    //   const defaultValue = fragmentManager?.resolve(rawValue)?.defaultValue;
    //
    //   base = {
    //     // [`--${_id}`]: solidFill,
    //     background: `var(--${_id}, ${defaultValue})`,
    //   };
    // }
  }, [fillType, cssImageFill, cssSolidFill]);
};
