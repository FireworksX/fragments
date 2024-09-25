import { Entity, isGraph, isLinkKey, LinkKey } from "@graph-state/core";
import { isGraphOfType } from "@graph-state/checkers";
import { definitions } from "@fragments/plugin-state";

export const isComputedValueLink = (link: Entity) =>
  link && isGraphOfType(definitions.nodes.ComputedValue)(link);
