import { z } from "zod";
import {
  layerAlign,
  layerDirection,
  layerDistribute,
  layerMode,
} from "@fragments/plugin-fragment";

export const layerSchema = z.object({
  layerMode: z.enum(Object.keys(layerMode)).default(layerMode.none),
  layerAlign: z.enum(Object.keys(layerAlign)).default(layerAlign.start),
  layerDirection: z
    .enum(Object.keys(layerDirection))
    .default(layerDirection.horizontal),
  layerDistribute: z
    .enum(Object.keys(layerDistribute))
    .default(layerDistribute.start),
  layerWrap: z.boolean().default(false),
  layerGap: z.number().nonnegative().default(0),
});
