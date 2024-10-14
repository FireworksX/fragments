import { Entity } from "@graph-state/core";
import { nodes } from "src";
import { isGraphOfType } from "@graph-state/checkers";

export const isVariableLink = (link: Entity) =>
  link && isGraphOfType(nodes.Variable)(link);
