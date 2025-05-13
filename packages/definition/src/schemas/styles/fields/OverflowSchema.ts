import { layerField } from "@/helpers/layerField";
import * as v from "valibot";
import { overflow } from "@/constants";

export const OverflowSchema = layerField(v.picklist(Object.keys(overflow)), {
  fallback: overflow.hidden,
});
