import * as v from "valibot";
import { layerField, linkValidator } from "@/helpers/layerField";
import { FrameSchema } from "@/schemas/nodes/FrameSchema";
import { ChildrenSchema } from "@/schemas/ChildrenSchema";
import { GraphFieldSchema } from "@/schemas/GraphFieldSchema";
import { OverridesSchema } from "@/schemas/OverridesSchema";
import { PositionSchema } from "@/schemas/styles/PositionSchema";
import { SceneSchema } from "@/schemas/styles/SceneSchema";
import { FillSchema } from "@/schemas/styles/FillSchema";
import { BorderSchema } from "@/schemas/styles/BorderSchema";
import { SizeSchema } from "@/schemas/styles/SizeSchema";
import { LayerSchema } from "@/schemas/styles/LayerSchema";
import { InteractionsSchema } from "@/schemas/InteractionsSchema";
import { CssOverrideSchema } from "@/schemas/CssOverrideSchema";
import { LinkSchema } from "@/schemas/LinkSchema";

export const CollectionSchema = v.pipe(
  v.object({
    name: layerField(v.string(), {
      fallback: "Collection",
      overridable: false,
    }),
    parent: layerField(v.nullable(v.string()), { overridable: false }),
    source: layerField(linkValidator, {}),
    ...ChildrenSchema.entries,
    ...GraphFieldSchema.entries,
    ...OverridesSchema.entries,
    ...PositionSchema.entries,
    ...SceneSchema.entries,
    ...FillSchema.entries,
    ...BorderSchema.entries,
    ...SizeSchema.entries,
    ...LayerSchema.entries,
    ...InteractionsSchema.entries,
    ...CssOverrideSchema.entries,
    ...LinkSchema.entries,
  })
);
