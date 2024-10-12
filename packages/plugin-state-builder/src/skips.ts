import { isInstanceOf } from "@graph-state/checkers";
import { SpringValue, Interpolation } from "@react-spring/web";

export const skips = [isInstanceOf(SpringValue), isInstanceOf(Interpolation)];
