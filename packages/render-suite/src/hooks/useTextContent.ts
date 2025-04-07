import { useMemo } from "react";
import { GraphState, LinkKey } from "@graph-state/core";
import { isValue } from "@fragmentsx/utils";
import { wrapTextInParagraphWithAttributes } from "@fragmentsx/render-core";
import { useLayerValue } from "@/hooks/useLayerValue";

export const useTextContent = (layerKey: LinkKey, manager: GraphState) => {
  const [content, , contentInfo] = useLayerValue(layerKey, "content", manager);
  const [attributes] = useLayerValue(layerKey, "attributes", manager);

  return useMemo(() => {
    if (contentInfo.isVariable && isValue(attributes)) {
      return wrapTextInParagraphWithAttributes(content, attributes);
    }

    return content;
  }, [contentInfo, content, attributes]);
};
