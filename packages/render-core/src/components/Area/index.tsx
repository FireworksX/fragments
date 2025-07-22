import { createContext, FC } from "preact/compat";
import { useArea } from "./hooks/useArea";
import { GlobalManager } from "@/providers/GlobalManager";
import { Instance } from "@/components/Instance";

export interface AreaProps {
  areaCode: string;
  globalManager?: unknown;
}

const AreaInitial: FC<AreaProps> = (areaProps) => {
  const areaData = useArea(areaProps);

  if (!areaData) return null;

  return <Instance fragmentId={areaData.fragmentId} props={areaData?.props} />;
};

export const Area = (props: AreaProps) => {
  return "globalManager" in props ? (
    <GlobalManager value={props.globalManager}>
      <AreaInitial {...props} />
    </GlobalManager>
  ) : (
    <AreaInitial {...props} />
  );
};
