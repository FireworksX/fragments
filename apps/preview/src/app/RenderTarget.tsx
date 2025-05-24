import { GlobalManager, Instance } from "@fragmentsx/render-react";
import { useSearchParams } from "next/navigation";
import { useGlobalManager } from "@fragmentsx/render-react";

export const RenderTarget = () => {
  const params = useSearchParams();
  const fragmentId = params.get("node");
  const { manager: globalManager } = useGlobalManager();

  return (
    <>
      <Instance fragmentId={+fragmentId} />
    </>
  );
};

export default RenderTarget;
