import { useContext } from "react";
import { GlobalManager } from "@/components/GlobalManager";

export const useGlobalManager = () => useContext(GlobalManager);
