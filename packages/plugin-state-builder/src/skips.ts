import { isInstanceOf } from "@graph-state/checkers";
import { SpringValue } from "@react-spring/web";

export const skips = [isInstanceOf(SpringValue)];
