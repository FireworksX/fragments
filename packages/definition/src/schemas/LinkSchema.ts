import * as v from "valibot";
import { layerField } from "@/helpers/layerField";
import { linkTarget } from "@/constants";

export const LinkSchema = v.object({
  href: layerField(v.string(), { fallback: null }),
  hrefTarget: layerField(v.picklist(Object.keys(linkTarget)), {
    fallback: linkTarget._blank,
  }),
});
