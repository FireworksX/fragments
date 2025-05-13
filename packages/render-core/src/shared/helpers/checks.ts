import { definition } from "@fragmentsx/definition";

export const isVariableLink = (value: unknown) =>
  isLink(value) && value?.split(":")?.at(0) === definition.nodes.Variable;

export const isLink = (value: unknown) =>
  value && value?.split?.(":")?.length === 2;
