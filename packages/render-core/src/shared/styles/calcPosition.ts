import { definition } from "@fragmentsx/definition";
import { GraphState, LinkKey } from "@graph-state/core";
import { isTopLevel } from "@/shared/helpers";
import { toPx } from "@fragmentsx/utils";

interface CalcPositionOptions {
  isTop: boolean;
  position: keyof typeof definition.positionType;
  top: number;
  left: number;
}

export const calcPosition = (manager: GraphState, layerKey: LinkKey) => {
  const layer = manager.resolve(layerKey);
  const isTop = isTopLevel(manager, layerKey);

  return {
    position: isTop ? definition.positionType.relative : layer.position,
    top:
      !isTop && layer.position === definition.positionType.absolute
        ? toPx(layer.top)
        : null,
    left:
      !isTop && layer.position === definition.positionType.absolute
        ? toPx(layer.left)
        : null,
  };
};

// export const calcPosition = ({
//   isTop,
//   position,
//   top,
//   left,
// }: CalcPositionOptions) => {
//   const isDocument = true;
//   const instanceLayerKey = true;
//   const skipPosition = (isTop && isDocument) || (!!instanceLayerKey && isTop);
//
//   return {
//     position: skipPosition ? definition.positionType.relative : position,
//     top:
//       position === definition.positionType.absolute && !skipPosition
//         ? top
//         : null,
//     left:
//       position === definition.positionType.absolute && !skipPosition
//         ? left
//         : null,
//   };
// };
