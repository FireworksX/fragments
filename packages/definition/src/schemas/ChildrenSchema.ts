import * as v from "valibot";
import { layerField } from "@/helpers/layerField";

export const ChildrenSchema = v.object({
  children: layerField(v.array(v.string()), {
    fallback: [],
    overridable: false,
  }),
});
