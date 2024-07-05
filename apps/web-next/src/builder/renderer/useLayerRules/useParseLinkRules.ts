import { useLayerInvokerNew } from "../useLayerInvokerNew.ts";

export const useParseLinkRules = (layerField: Field) => {
  const layerInvoker = useLayerInvokerNew(layerField);
  const attributes = {};

  if (typeof layerInvoker("hyperlinkHref").value === "string") {
    attributes.TagName = "a";
    attributes.href = layerInvoker("hyperlinkHref").value;

    if (layerInvoker("hyperlinkNewTab").value) {
      attributes.target = "_blank";
    }
  }

  return attributes;
};
