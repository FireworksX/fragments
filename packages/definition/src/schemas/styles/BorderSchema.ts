import * as v from "valibot";
import { layerField } from "@/helpers/layerField";
import { borderType } from "@/constants";

export const BorderSchema = v.object({
  borderType: layerField(v.picklist(Object.keys(borderType)), {
    fallback: borderType.None,
  }),
  borderWidth: layerField(v.string(), {
    fallback: "1px",
    transform: (value) => {
      if (typeof value === "number") {
        return `${value}px`;
      }
      return value;
    },
  }),
  borderColor: layerField(v.string(), { fallback: "#fff" }),
});
