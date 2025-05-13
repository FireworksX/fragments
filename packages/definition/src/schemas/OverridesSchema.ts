import * as v from "valibot";
import { layerField } from "@/helpers/layerField";

export const OverridesSchema = v.object({
  overrides: layerField(v.array(v.string()), { overridable: false }),
  overrideFrom: layerField(v.nullable(v.string()), { overridable: false }),
});
