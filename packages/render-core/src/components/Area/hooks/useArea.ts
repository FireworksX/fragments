import { useGlobalManager } from "@/shared/hooks/useGlobalManager";
import { AreaProps } from "@/components/Area";
import { useEffect, useState } from "preact/compat";

export const useArea = (options: AreaProps) => {
  const { manager: resultGlobalManager, queryArea } = useGlobalManager(
    options?.globalManager
  );
  const [areaData, setAreaData] = useState(queryArea(options.areaCode));

  useEffect(() => {
    (async () => {
      const response = await queryArea(options.areaCode);

      if (response) {
        setAreaData(response);
      }
    })();
  }, []);

  return {
    ...areaData,
    globalManager: resultGlobalManager,
  };
};
