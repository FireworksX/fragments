import { generateId } from "@fragments/utils";
import { nodes, variableTransforms } from "@/defenitions.ts";

export const createTransformValueNegative = () => ({
  _type: nodes.TransformValue,
  _id: generateId(),
  name: variableTransforms.negative,
});
