import { useContext, useMemo } from "preact/compat";
import { GraphState, keyOfEntity, LinkKey } from "@graph-state/core";
import { definition } from "@fragmentsx/definition";
import { isValue } from "@fragmentsx/utils";
import { useLayerValue } from "@/shared/hooks/useLayerValue";
import { wrapTextInParagraphWithAttributes } from "@/shared/helpers/wrapTextInParagraphWithAttributes";
import { FragmentContext } from "@/components/Fragment/FragmentContext";
import { useReadVariables } from "@/shared/hooks/useReadVariables";
import { useReadVariable } from "@/shared/hooks/useReadVariable";
import { useGraphStack } from "@graph-state/react";

function extractVariablesFromHtml(html: string) {
  if (!html) return [];
  const regex =
    /<span(?=\s)(?=(?:[^>]*?\s)?class="[^"]*variable[^"]*")(?=(?:[^>]*?\s)?data-type="mention")(?=(?:[^>]*?\s)?data-id="([^"]+)")[^>]*>.*?<\/span>/gi;

  const mentions = [];
  let match;

  while ((match = regex.exec(html)) !== null) {
    mentions.push({
      fullMatch: match[0],
      dataId: match[1],
      variableKey: keyOfEntity({
        _type: definition.nodes.Variable,
        _id: match[1],
      }),
      position: match.index,
    });
  }

  return mentions;
}

export const useTextContent = (layerKey: LinkKey, manager: GraphState) => {
  const { manager: fragmentManager } = useContext(FragmentContext);
  const [content, , contentInfo] = useLayerValue(
    layerKey,
    "content",
    fragmentManager
  );

  const variables = extractVariablesFromHtml(content);
  const { readVariable } = useReadVariable();
  const variablesStack = useGraphStack(
    fragmentManager,
    variables.map((variable) => variable.variableKey)
  );

  let nextContent = content;

  variables.forEach((variable) => {
    nextContent = nextContent.replace(
      variable.fullMatch,
      readVariable(variable.variableKey).value
    );
  });

  return nextContent;

  // const [attributes] = useLayerValue(layerKey, "attributes", fragmentManager);

  // const resultAttributes = {
  //   ...attributes,
  //   color: attributes?.color ?? "rgb(0, 0, 0)",
  // };

  // return useMemo(() => {
  //   if (typeof content === "string" && isValue(attributes)) {
  //     return wrapTextInParagraphWithAttributes(content, resultAttributes);
  //   }
  //
  //   return content;
  // }, [contentInfo, content, attributes]);
};
