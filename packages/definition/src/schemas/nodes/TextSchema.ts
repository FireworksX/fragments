import * as v from "valibot";
import { layerField } from "@/helpers/layerField";
import { GraphFieldSchema } from "@/schemas/GraphFieldSchema";
import { OverridesSchema } from "@/schemas/OverridesSchema";
import { PositionSchema } from "@/schemas/styles/PositionSchema";
import { SceneSchema } from "@/schemas/styles/SceneSchema";
import { SizeSchema } from "@/schemas/styles/SizeSchema";

export const TextSchema = v.object({
  name: layerField(v.string(), { fallback: "Text", overridable: false }),
  content: layerField(v.string(), {
    fallback: "",
  }),
  variableContent: layerField(v.string(), { fallback: null, variable: true }),
  attributes: layerField(
    v.object({
      fontSize: layerField(v.string(), { fallback: "14px" }),
      color: layerField(v.string(), { fallback: "#000" }),
      lineHeight: layerField(v.string(), { fallback: "14px" }),
    }),
    { fallback: {} }
  ),
  ...GraphFieldSchema.entries,
  ...OverridesSchema.entries,
  ...PositionSchema.entries,
  ...SceneSchema.entries,
  ...SizeSchema.entries,
});
