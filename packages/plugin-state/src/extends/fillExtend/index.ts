import { SolidPaint } from "src/types/props";
import { solidFillExtend } from "./solidFillExtend";
import { Extender } from "@/types";
import { valueSetter } from "@/shared/valueSetter.ts";
import { paintMode } from "@/definitions.ts";
import { imageFillExtend } from "@/extends/fillExtend/imageFillExtend";

export const getDefaultSolidFill = (): SolidPaint => ({
  type: paintMode.Solid,
  color: {
    r: 86,
    g: 196,
    b: 187,
  },
});

export const fillExtend: Extender = (payload) => {
  const solidFill = solidFillExtend(payload);
  const imageFill = imageFillExtend(payload);

  return {
    ...payload.graph,
    ...solidFill,
    ...imageFill,
    fillType: payload.getValue("fillType"),
    setFillType: valueSetter(payload.state, payload.graphKey, "fillType"),
  };
};

fillExtend.symbol = Symbol("fillExtend");
