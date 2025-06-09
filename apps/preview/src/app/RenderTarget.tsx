import { GlobalManager, Instance } from "@fragmentsx/render-react";
import { useSearchParams } from "next/navigation";
import { useGlobalManager } from "@fragmentsx/render-react";

export const RenderTarget = () => {
  const params = useSearchParams();
  const fragmentId = params.get("node");
  const { manager: globalManager } = useGlobalManager();

  return (
    <>
      <Instance
        fragmentId={+fragmentId}
        props={{
          ade177f5ef56: "Записаться",
          e037940040d198: () => {
            console.log("call");
          },
        }}
        options={{ ssr: false }}
      />
    </>
  );
};

export default RenderTarget;
