import { generateId } from "@fragmentsx/utils";

export const getEmptyFragment = (fragmentId: string) => {
  const layerId = generateId();

  return {
    [`Fragment:${fragmentId}`]: {
      _type: "Fragment",
      _id: fragmentId,
      children: [`Frame:${layerId}`],
      layoutSizingHorizontal: "Fixed",
      layoutSizingVertical: "Fixed",
      horizontalGrow: "auto",
      verticalGrow: "auto",
      renderMode: "parent",
      opacity: 1,
      visible: true,
      overflow: "hidden",
      overrides: [],
      properties: ["Variable:62218c840bd111"],
    },
    [`Frame:${layerId}`]: {
      _type: "Frame",
      _id: layerId,
      opacity: 1,
      visible: true,
      overflow: "visible",
      children: [],
      width: 320,
      height: 200,
      layoutSizingHorizontal: "Fixed",
      layoutSizingVertical: "Fixed",
      fillType: "Solid",
      positionType: "absolute",
      solidFill: "rgba(255, 255, 255, 1)",
      name: "Frame",
      isPrimary: true,
      threshold: 320,
    },
  };
};
