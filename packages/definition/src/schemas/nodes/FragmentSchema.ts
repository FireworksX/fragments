import * as v from "valibot";
import { layerField } from "@/helpers/layerField";
import { ChildrenSchema } from "@/schemas/ChildrenSchema";
import { GraphFieldSchema } from "@/schemas/GraphFieldSchema";
import { fragmentGrowingMode } from "@/constants";

export const FragmentSchema = v.object({
  name: layerField(v.string(), { fallback: "Fragment", overridable: false }),
  horizontalGrow: layerField(v.enum(Object.keys(fragmentGrowingMode)), {
    fallback: fragmentGrowingMode.auto,
    overridable: false,
  }),
  verticalGrow: layerField(v.enum(Object.keys(fragmentGrowingMode)), {
    fallback: fragmentGrowingMode.auto,
    overridable: false,
  }),
  properties: layerField(v.array(v.string()), {
    fallback: [],
    overridable: false,
  }),
  ...GraphFieldSchema.entries,
  ...ChildrenSchema.entries,
});
