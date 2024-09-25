import { isFiniteNumber } from "@fragments/utils";

export function pinnedOffset(start, end) {
  if (!isFiniteNumber(start) || !isFiniteNumber(end)) return null;
  return start + end;
}
