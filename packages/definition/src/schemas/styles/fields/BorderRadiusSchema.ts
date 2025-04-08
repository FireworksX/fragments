import { layerField } from "@/helpers/layerField";
import * as v from "valibot";

export const BorderRadiusSchema = layerField(v.string(), { fallback: "0px" });
