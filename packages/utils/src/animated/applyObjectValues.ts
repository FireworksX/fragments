import { SpringValue } from "@react-spring/core";

export const applyObjectValues = (
  target: Record<string, any>,
  value: Record<string, any>
) => {
  const resultValue = { ...target };

  Object.keys(resultValue).forEach((key) => {
    if (key in value) {
      if (resultValue[key] instanceof SpringValue) {
        resultValue[key].set(value[key]);
      } else {
        resultValue[key] = value[key];
      }
    }
  });

  return resultValue;
};
