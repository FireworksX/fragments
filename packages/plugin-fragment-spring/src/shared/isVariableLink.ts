import { Entity } from "@graph-state/core";
import { isGraphOfType } from "@graph-state/checkers";
import { nodes } from "@fragments/plugin-fragment";

export const isVariableLink = (link: Entity) =>
  link && isGraphOfType(nodes.Variable)(link);
