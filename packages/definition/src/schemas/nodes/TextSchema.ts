import * as v from "valibot";
import { layerField } from "@/helpers/layerField";
import { GraphFieldSchema } from "@/schemas/GraphFieldSchema";
import { OverridesSchema } from "@/schemas/OverridesSchema";
import { PositionSchema } from "@/schemas/styles/PositionSchema";
import { SceneSchema } from "@/schemas/styles/SceneSchema";
import { SizeSchema } from "@/schemas/styles/SizeSchema";
import { whiteSpace } from "@/constants";
import { CssOverrideSchema } from "@/schemas/CssOverrideSchema";

export const TextSchema = v.object({
  name: layerField(v.string(), { fallback: "Text", overridable: false }),
  content: layerField(v.string(), {
    fallback: "",
  }),
  whiteSpace: layerField(v.enum(Object.keys(whiteSpace)), {
    fallback: whiteSpace.pre,
  }),
  textAlign: layerField(v.string(), { fallback: "left" }),

  parent: layerField(v.nullable(v.string()), { overridable: false }),
  ...GraphFieldSchema.entries,
  ...OverridesSchema.entries,
  ...CssOverrideSchema.entries,
  ...PositionSchema.entries,
  ...SceneSchema.entries,
  ...SizeSchema.entries,
});
