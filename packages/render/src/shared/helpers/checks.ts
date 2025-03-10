import { nodes } from "@/definitions";

export const isVariableLink = (value: unknown) =>
  isLink(value) && value?.split(":")?.at(0) === nodes.Variable;

export const isLink = (value: unknown) =>
  value && value?.split?.(":")?.length === 2;
