import { GlobalManager, Instance } from "@fragmentsx/render-react";
import { useSearchParams } from "next/navigation";

export const RenderTarget = () => {
  const params = useSearchParams();
  const fragmentId = params.get("node");

  return (
    <>
      <Instance fragmentId={+fragmentId} />
    </>
  );
};

export default RenderTarget;
