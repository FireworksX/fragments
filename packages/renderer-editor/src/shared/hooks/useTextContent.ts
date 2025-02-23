import { useLayerVariableValue } from "@/shared/hooks/useLayerVariableValue.ts";
import { useLayerValue } from "@/shared/hooks/useLayerValue.ts";
import { useMemo } from "react";
import { wrapTextInParagraphWithAttributes } from "@/shared/helpers/wrapTextInParagraphWithAttributes.ts";
import { GraphState, LinkKey } from "@graph-state/core";
import { isValue } from "@fragments/utils";

export const useTextContent = (layerKey: LinkKey, manager?: GraphState) => {
  const [content, _, contentInfo] = useLayerVariableValue(
    layerKey,
    "content",
    manager
  );
  const [attributes] = useLayerValue(layerKey, "attributes", manager);

  return useMemo(() => {
    if (contentInfo.isVariable && isValue(attributes)) {
      return wrapTextInParagraphWithAttributes(content, attributes);
    }

    return content;
  }, [contentInfo, content, attributes]);
};
