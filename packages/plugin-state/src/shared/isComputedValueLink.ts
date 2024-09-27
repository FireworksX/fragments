import { Entity, isGraph, isLinkKey, LinkKey } from "@graph-state/core";
import { nodes } from "@/definitions.ts";
import { isGraphOfType } from "@graph-state/checkers";

export const isComputedValueLink = (link: Entity) =>
  link && isGraphOfType(nodes.ComputedValue)(link);
