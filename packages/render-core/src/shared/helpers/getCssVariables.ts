import { isVariableLink } from "@/shared/helpers/checks";
import { entityOfKey, LinkKey } from "@graph-state/core";
import { cleanGraph } from "@fragmentsx/utils";

export const getCssVariables = (props: Record<string, LinkKey>) => {
  return Object.entries(cleanGraph(props)).reduce((acc, [key, value]) => {
    if (isVariableLink(value)) {
      const nestedVariableId = entityOfKey(value)?._id;
      value = `var(--${nestedVariableId})`;
    }

    acc[`--${key}`] = value;
    return acc;
  }, {});
};
