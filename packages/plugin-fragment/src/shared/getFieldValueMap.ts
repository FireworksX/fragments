import { GraphState } from "@graph-state/core";
import { getFieldValue } from "@/shared/getFieldValue.ts";

export const getFieldValueMap = (node, fields: string[], cache: GraphState) =>
  fields.reduce((acc, field) => {
    acc[field] = getFieldValue(node, field, cache);
    return acc;
  }, {});
