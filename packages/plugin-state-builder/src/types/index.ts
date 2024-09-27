import { GraphState, LinkKey } from "@graph-state/core";

export interface ExtenderPayload<TGrpah> {
  state: GraphState;
  graph: TGrpah;
  graphKey: LinkKey;
  resolveField: (field: string) => unknown;
  getValue: (fieldKey: string, fallbackValue?: unknown) => unknown;
}

export type Extender = <TGrpah, TExtend>(
  payload: ExtenderPayload<TGrpah>
) => TGrpah & TExtend;
