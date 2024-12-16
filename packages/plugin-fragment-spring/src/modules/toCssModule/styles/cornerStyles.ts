import { getFieldValue, toPx } from "@fragments/plugin-fragment";

export const cornerStyles = (node, cache) => {
  const cornerRadius = getFieldValue(node, "cornerRadius", cache);

  return {
    borderRadius: cornerRadius,
  };
};
