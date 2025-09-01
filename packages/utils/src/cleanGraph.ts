import { isObject } from "./isObject";
import { omit } from "./omit";

export const cleanGraph = (input: unknown) =>
  isObject(input) ? omit(input, "_type", "_id") : input;
