import { FC } from "react";
import {
  AreaProps,
  GlobalManager,
  useArea,
  useGlobalManager,
} from "@fragmentsx/render-core";
import { Instance } from "@/components/Instance";

interface Options {
  ssr?: boolean;
}

interface ResultAreaProps extends AreaProps {
  options?: Options;
}

const AreaInitial: FC<ResultAreaProps> = (areaProps) => {
  const { manager: globalManager } = useGlobalManager(areaProps?.globalManager);
  const ssr = areaProps?.options?.ssr ?? true;

  if (ssr) {
    globalManager?.$load?.loadArea?.(areaProps.areaCode, {
      suspense: true,
    });
  }

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
