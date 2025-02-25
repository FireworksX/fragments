import { use } from "react";
import { FragmentsGlobalContext } from "@/components/FragmentsGlobalContext";

export const useGlobalContext = () => {
  const context = use(FragmentsGlobalContext);
  return context;
};
