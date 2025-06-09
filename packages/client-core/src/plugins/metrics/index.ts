import { Plugin } from "@graph-state/core";
import { addClientMetric } from "./queries/addClientMetric";
import { createConstants } from "@fragmentsx/utils";

const types = createConstants(
  "INIT_SESSION",
  "RELEASE_SESSION",
  "REACH_PROJECT_GOAL"
);

export const metricsPlugin: Plugin = (state) => {
  const sendMetric = (type: keyof typeof types, value?: string) => {
    const sendBeacon = state?.$fetch?.sendBeacon;
    const query = state?.$fetch?.query;

    query(addClientMetric, { type, value });

    // if (sendBeacon) {
    //   try {
    //     sendBeacon({ query: addClientMetric, variables: { type, value } });
    //   } catch (e) {
    //     query(addClientMetric, { type, value });
    //   }
    // }
  };

  const initClient = async () => {
    const status = state?.$global?.status;
    if (status === null) {
      sendMetric(types.INIT_SESSION);
      state.$global.status = "init";
    } else {
      console.log("Client already init or released");
    }
  };

  const releaseClient = async () => {
    const status = state?.$global?.status;

    if (status === "init") {
      sendMetric(types.RELEASE_SESSION);
      state.$global.status = "release";
    }
  };

  const reachGoal = (goal: string) => {
    sendMetric(types.REACH_PROJECT_GOAL, goal);
  };

  state.$metrics = {
    initClient,
    releaseClient,
    reachGoal,
  };
};
