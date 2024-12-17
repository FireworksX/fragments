import { to as libTo } from "@react-spring/web";

export const to = (...args) => {
  console.trace("create Interpolation");
  return libTo(...args);
};
