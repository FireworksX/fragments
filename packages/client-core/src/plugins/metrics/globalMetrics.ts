import { Plugin } from "@graph-state/core";
import { addClientMetric } from "./queries/addClientMetric";
import { createConstants, isBrowser } from "@fragmentsx/utils";

declare module "@graph-state/core" {
  interface GraphState {
    $metrics: {
      reachGoal: (goal: string) => void;
    };
  }
}

const types = createConstants(
  "INIT_SESSION",
  "RELEASE_SESSION",
  "REACH_PROJECT_GOAL"
);

export const globalMetricsPlugin: Plugin = (state) => {
  const history = new Set<keyof typeof types>([]);

  const sendMetric = async (type: keyof typeof types, value?: string) => {
    if (
      [types.INIT_SESSION, types.RELEASE_SESSION].some((v) => history.has(v))
    ) {
      return;
    }

    const query = state?.$fetch?.query;
    await query(addClientMetric, { type, value });
    history.add(type);
  };

  const reachGoal = (goal: string) => {
    sendMetric(types.REACH_PROJECT_GOAL, goal);
  };

  if (isBrowser && !state?.env?.isSelf) {
    sendMetric(types.INIT_SESSION);

    window.addEventListener("beforeunload", () => {
      sendMetric(types.RELEASE_SESSION);
    });
  }

  state.$metrics = {
    reachGoal,
  };
};
