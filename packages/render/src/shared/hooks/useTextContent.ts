import { useMemo } from "preact/compat";
import { GraphState, LinkKey } from "@graph-state/core";
import { isValue } from "@fragments/utils";
import { useLayerValue } from "@/shared/hooks/useLayerValue";
import { wrapTextInParagraphWithAttributes } from "@/shared/helpers/wrapTextInParagraphWithAttributes";

export const useTextContent = (layerKey: LinkKey, manager?: GraphState) => {
  const [content, _, contentInfo] = useLayerValue(layerKey, "content", manager);
  const [attributes] = useLayerValue(layerKey, "attributes", manager);

  return useMemo(() => {
    if (contentInfo.isVariable && isValue(attributes)) {
      return wrapTextInParagraphWithAttributes(content, attributes);
    }

    return content;
  }, [contentInfo, content, attributes]);
};
