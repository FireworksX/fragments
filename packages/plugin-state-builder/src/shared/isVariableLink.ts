import { Entity } from "@graph-state/core";
import { isGraphOfType } from "@graph-state/checkers";
import { definitions } from "@fragments/plugin-state";

export const isVariableLink = (link: Entity) =>
  link && isGraphOfType(definitions.nodes.Variable)(link);
