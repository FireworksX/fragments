import * as v from "valibot";
import { layerField } from "@/helpers/layerField";
import { GraphFieldSchema } from "@/schemas/GraphFieldSchema";
import { OverridesSchema } from "@/schemas/OverridesSchema";
import { PositionSchema } from "@/schemas/styles/PositionSchema";
import { SceneSchema } from "@/schemas/styles/SceneSchema";
import { SizeSchema } from "@/schemas/styles/SizeSchema";
import { LinkSchema } from "@/schemas/LinkSchema";

export const InstanceSchema = v.object({
  name: layerField(v.string(), { fallback: "Instance", overridable: false }),
  fragment: layerField(v.number()),
  parent: layerField(v.nullable(v.string()), { overridable: false }),
  props: layerField(
    v.record(
      v.string(),
      v.union([
        v.string(),
        v.number(),
        v.boolean(),
        // For goals
        v.object({
          code: v.string(),
          name: v.string(),
        }),
      ])
    ),
    {
      fallback: {},
    }
  ),
  ...GraphFieldSchema.entries,
  ...OverridesSchema.entries,
  ...PositionSchema.entries,
  ...SizeSchema.entries,
  ...SceneSchema.entries,
  ...LinkSchema.entries,
});
