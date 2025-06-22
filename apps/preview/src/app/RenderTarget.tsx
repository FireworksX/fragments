"use client";
import { GlobalManager, Instance } from "@fragmentsx/render-react";
import { useSearchParams } from "next/navigation";
import { useGlobalManager } from "@fragmentsx/render-react";
import { renderToString } from "react-dom/server";
import prepass from "react-ssr-prepass";

export const RenderTarget = () => {
  const params = useSearchParams();
  const fragmentId = params.get("node");
  const { manager: globalManager } = useGlobalManager();

  const doRender = async () => {
    const Node = <h1>tst</h1>;

    await prepass(Node);

    const res = renderToString(Node);

    console.log(res);
  };

  return (
    <>
      <button onClick={doRender}>To String</button>
      <Instance
        fragmentId={+fragmentId}
        props={{
          ade177f5ef56: "Записаться",
          e037940040d198: () => {
            console.log("call");
          },
        }}
        options={{ ssr: true }}
      />
    </>
  );
};

export default RenderTarget;
