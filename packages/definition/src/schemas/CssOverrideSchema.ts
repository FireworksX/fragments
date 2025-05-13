import * as v from "valibot";
import {
  isVariableLink,
  layerField,
  linkValidator,
} from "@/helpers/layerField";
import { interactions } from "@/constants";

export const CssOverrideSchema = v.object({
  cssOverride: layerField(v.string(), { fallback: "" }),
});
