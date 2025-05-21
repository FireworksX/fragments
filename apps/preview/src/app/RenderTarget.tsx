import { GlobalManager, Instance } from "@fragmentsx/render-react";
import { useSearchParams } from "next/navigation";
import { useGlobalManager } from "@fragmentsx/render-react";

export const RenderTarget = () => {
  const params = useSearchParams();
  const fragmentId = params.get("node");
  const { manager: globalManager } = useGlobalManager();

  return (
    <>
      <button
        onClick={() => {
          console.log(globalManager);
          globalManager?.$metrics.reachGoal("header-click");
        }}
      >
        test
      </button>
      <Instance fragmentId={+fragmentId} />
    </>
  );
};

export default RenderTarget;
