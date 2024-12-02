// Функция для применения списка модулей
import { Module } from "@/types";
import { GraphState } from "@graph-state/core";

export function applyModules<T>(
  node: T,
  modules: Module<T>[],
  cache: GraphState
): T {
  return modules.reduce(
    (currentNode, module) => module(currentNode, cache),
    node
  );
}
