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
  variableContent: layerField(v.string(), { fallback: null, variable: true }),
  parent: layerField(v.nullable(v.string()), { overridable: false }),
  attributes: v.optional(
    v.object({
      fontSize: layerField(v.string(), { fallback: "14px" }),
      color: layerField(v.string(), { fallback: "#000", variable: true }),
      lineHeight: layerField(v.string(), { fallback: 1.4 }),
      fontWeight: layerField(v.string(), { fallback: "normal" }),
      letterSpacing: layerField(v.string(), { fallback: "0px" }),
      textTransform: layerField(v.string(), { fallback: "none" }),
      textDecoration: layerField(v.string(), { fallback: "none" }),
      whiteSpace: layerField(v.string(), { fallback: "pre" }),
      textAlign: layerField(v.string(), { fallback: "left" }),
    })
  ),
  ...GraphFieldSchema.entries,
  ...OverridesSchema.entries,
  ...CssOverrideSchema.entries,
  ...PositionSchema.entries,
  ...SceneSchema.entries,
  ...SizeSchema.entries,
});
