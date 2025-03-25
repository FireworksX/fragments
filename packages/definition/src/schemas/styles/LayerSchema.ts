import * as v from "valibot";
import { layerField } from "@/helpers/layerField";
import {
  layerAlign,
  layerDirection,
  layerDistribute,
  layerMode,
} from "@/constants";

export const LayerSchema = v.object({
  layerMode: layerField(v.picklist(Object.keys(layerMode)), {
    fallback: layerMode.none,
  }),
  layerAlign: layerField(v.picklist(Object.keys(layerAlign)), {
    fallback: layerAlign.start,
  }),
  layerDirection: layerField(v.picklist(Object.keys(layerDirection)), {
    fallback: layerDirection.horizontal,
  }),
  layerDistribute: layerField(v.picklist(Object.keys(layerDistribute)), {
    fallback: layerDistribute.start,
  }),
  layerWrap: layerField(v.boolean(), { fallback: false }),
  layerGap: layerField(v.pipe(v.number(), v.minValue(0)), { fallback: 0 }),

  padding: layerField(v.string(), { fallback: "0px" }),
});
