import { Plugin } from "@graph-state/core";
import { initClientRequest } from "./queries/initClient";

export const metricsPlugin: Plugin = (state) => {
  const initClient = async () => {
    const query = state?.$fetch?.query;

    if (query) {
      await query(initClientRequest);
    }
  };

  const reachGoal = (goal: string) => {};

  state.$metrics = {
    initClient,
    reachGoal,
  };
};
