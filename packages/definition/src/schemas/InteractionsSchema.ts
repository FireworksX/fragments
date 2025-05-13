import * as v from "valibot";
import {
  isVariableLink,
  layerField,
  linkValidator,
} from "@/helpers/layerField";
import { interactions } from "@/constants";

export const InteractionsSchema = v.object({
  interactions: layerField(
    v.array(
      v.object({
        on: v.enum(Object.keys(interactions)),
        event: v.nullable(linkValidator),
      })
    ),
    { fallback: [] }
  ),
});
