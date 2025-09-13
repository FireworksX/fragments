import { useContext, useMemo } from "react";
import { LinkKey } from "@graph-state/core";
import { definition } from "@fragmentsx/definition";
import { useLayerValue } from "@/hooks/useLayerValue";
import { FragmentContext } from "@fragmentsx/render-react";

export const useLayerBackground = (layerKey: LinkKey) => {
  const [fillType] = useLayerValue(layerKey, "fillType");
  const [, , { resultValue: solidFill }] = useLayerValue(layerKey, "solidFill");
  const [, , { resultValue: imageFill }] = useLayerValue(layerKey, "imageFill");

  /*
  Тут есть проблема. Если устанавливается переменная, то
  нет реакции на изменение imageSize внутри переменной
   */
  const [, , { resultValue: imageSize }] = useLayerValue(layerKey, "imageSize");

  return useMemo(() => {
    if (fillType === definition.paintMode.Solid) {
      return {
        background: solidFill,
      };
    }
    if (fillType === definition.paintMode.Image && imageFill) {
      return {
        background: `url(${imageFill})`,
        backgroundSize: imageSize?.toLowerCase(),
        backgroundRepeat: "no-repeat",
      };
    }

    return {
      background: "transparent",
    };
  }, [fillType, solidFill, imageFill, imageSize]);
};
