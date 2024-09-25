import { Extender } from "@/types";

export const transformValueNegativeExtend: Extender = ({ graph }) => {
  return {
    ...graph,
    transform: (inputValue: boolean): boolean => {
      return !inputValue;
    },
  };
};
