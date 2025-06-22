import * as v from "valibot";
import { layerField } from "@/helpers/layerField";

export const LinkSchema = v.object({
  href: layerField(v.string(), { fallback: null }),
  hrefNewTab: layerField(v.boolean(), {
    fallback: true,
  }),
  // hrefTarget: layerField(v.picklist(Object.keys(linkTarget)), {
  //   fallback: linkTarget._blank,
  // }),
});
