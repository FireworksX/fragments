import * as v from "valibot";
import { layerField } from "@/helpers/layerField";
import { ChildrenSchema } from "@/schemas/ChildrenSchema";
import { GraphFieldSchema } from "@/schemas/GraphFieldSchema";
import { OverridesSchema } from "@/schemas/OverridesSchema";
import { PositionSchema } from "@/schemas/styles/PositionSchema";
import { SceneSchema } from "@/schemas/styles/SceneSchema";
import { FillSchema } from "@/schemas/styles/FillSchema";
import { BorderSchema } from "@/schemas/styles/BorderSchema";
import { SizeSchema } from "@/schemas/styles/SizeSchema";
import { LayerSchema } from "@/schemas/styles/LayerSchema";
import { OverflowSchema } from "@/schemas/styles/fields/OverflowSchema";
import { BorderRadiusSchema } from "@/schemas/styles/fields/BorderRadiusSchema";

export const FrameSchema = v.pipe(
  v.object({
    name: layerField(v.string(), { fallback: "Frame", overridable: false }),
    isBreakpoint: layerField(v.boolean(), {
      fallback: false,
      overridable: false,
    }),
    isPrimary: layerField(v.boolean(), { fallback: false, overridable: false }),
    threshold: layerField(v.pipe(v.number(), v.minValue(0)), {
      fallback: 320,
      overridable: false,
    }),
    ...ChildrenSchema.entries,
    ...GraphFieldSchema.entries,
    ...OverridesSchema.entries,
    ...PositionSchema.entries,
    ...SceneSchema.entries,
    ...FillSchema.entries,
    ...BorderSchema.entries,
    ...SizeSchema.entries,
    ...LayerSchema.entries,
    overflow: OverflowSchema,
    borderRadius: BorderRadiusSchema,
  })
);
