import { GraphState } from "@graph-state/core";

export const linkFragment = (target, linkedFragments: GraphState[]) => {
  if (target && linkedFragments) {
    linkedFragments.forEach((linked) => {
      linked.subscribe("Updater:root", () => {
        target.$fragment.update();
      });
    });
  }
};
