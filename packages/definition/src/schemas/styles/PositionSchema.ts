import * as v from "valibot";
import { layerField } from "@/helpers/layerField";
import { positionType } from "@/constants";

export const PositionSchema = v.object({
  position: layerField(v.enum(Object.keys(positionType)), {
    fallback: positionType.absolute,
  }),
  top: layerField(v.number(), { fallback: 0 }),
  left: layerField(v.number(), { fallback: 0 }),
});
