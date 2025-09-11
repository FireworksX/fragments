import * as v from "valibot";
import { layerField } from "@/helpers/layerField";
import { positionType } from "@/constants";

export const PositionSchema = v.object({
  position: layerField(v.enum(Object.keys(positionType)), {
    fallback: positionType.absolute,
  }),
  top: layerField(v.nullable(v.number()), {
    fallback: null,
    transform: (value) =>
      typeof value === "number" ? Math.ceil(value) : value,
  }),
  left: layerField(v.nullable(v.number()), {
    fallback: null,
    transform: (value) =>
      typeof value === "number" ? Math.ceil(value) : value,
  }),
  right: layerField(v.nullable(v.number()), {
    fallback: null,
    transform: (value) =>
      typeof value === "number" ? Math.ceil(value) : value,
  }),
  bottom: layerField(v.nullable(v.number()), {
    fallback: null,
    transform: (value) =>
      typeof value === "number" ? Math.ceil(value) : value,
  }),
  centerAnchorX: layerField(v.number(), {
    fallback: 0.5,
  }),
  centerAnchorY: layerField(v.number(), {
    fallback: 0.5,
  }),
});
