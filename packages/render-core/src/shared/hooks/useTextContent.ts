import { useContext, useMemo } from "preact/compat";
import { GraphState, LinkKey } from "@graph-state/core";
import { isValue } from "@fragmentsx/utils";
import { useLayerValue } from "@/shared/hooks/useLayerValue";
import { wrapTextInParagraphWithAttributes } from "@/shared/helpers/wrapTextInParagraphWithAttributes";
import { FragmentContext } from "@/components/Fragment/FragmentContext";

export const useTextContent = (layerKey: LinkKey, manager: GraphState) => {
  const { manager: fragmentManager } = useContext(FragmentContext);
  const [content, , contentInfo] = useLayerValue(
    layerKey,
    "content",
    fragmentManager
  );
  const [attributes] = useLayerValue(layerKey, "attributes", fragmentManager);

  const resultAttributes = {
    ...attributes,
    color: attributes?.color ?? "rgb(0, 0, 0)",
  };

  return useMemo(() => {
    if (typeof content === "string" && isValue(attributes)) {
      return wrapTextInParagraphWithAttributes(content, resultAttributes);
    }

    return content;
  }, [contentInfo, content, attributes]);
};
