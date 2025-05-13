import * as v from "valibot";
import { layerField } from "@/helpers/layerField";
import { overflow } from "@/constants";

export const SceneSchema = v.object({
  opacity: layerField(v.pipe(v.number(), v.minValue(0), v.maxValue(1)), {
    fallback: 1,
    variable: true,
  }),
  visible: layerField(v.boolean(), { fallback: true, variable: true }),
  zIndex: layerField(v.number(), { fallback: -1 }),
});
