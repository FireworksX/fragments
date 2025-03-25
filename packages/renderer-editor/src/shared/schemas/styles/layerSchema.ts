import { z, layerField } from "@/lib/zod.ts";
import {
  layerAlign,
  layerDirection,
  layerDistribute,
  layerMode,
} from "@fragments/plugin-fragment";

export const layerSchema = z.object({
  layerMode: layerField(z.enum(Object.keys(layerMode)), {
    fallback: layerMode.none,
  }),
  layerAlign: layerField(z.enum(Object.keys(layerAlign)), {
    fallback: layerAlign.start,
  }),
  layerDirection: layerField(z.enum(Object.keys(layerDirection)), {
    fallback: layerDirection.horizontal,
  }),
  layerDistribute: layerField(z.enum(Object.keys(layerDistribute)), {
    fallback: layerDistribute.start,
  }),
  layerWrap: layerField(z.boolean(), { fallback: false }),
  layerGap: layerField(z.number().nonnegative(), { fallback: 0 }),

  padding: layerField(z.string(), { fallback: "0px" }),
});
