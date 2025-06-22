import { Instance } from "@fragmentsx/render-react";
import prepass from "react-ssr-prepass";
import { renderToString } from "react-dom/server";
import { useGlobalManager, GlobalManager } from "@fragmentsx/render-react";
import { useEffect, useRef } from "react";
import save from "./save.json";

export const RenderNode = () => {
  const targetRef = useRef(null);
  const { manager: globalManager } = useGlobalManager();

  useEffect(() => {
    globalManager.$ssr.restoreData(save);
  }, []);

  const Node = (
    <GlobalManager value={globalManager}>
      <Instance
        fragmentId={+2}
        props={{
          ade177f5ef56: "Записаться",
          e037940040d198: () => {
            console.log("call");
          },
        }}
        options={{ ssr: true }}
      />
    </GlobalManager>
  );

  const doRender = async () => {
    await prepass(Node);
    const html = renderToString(Node);

    targetRef.current.innerHTML = html;
  };

  return (
    <>
      <div ref={targetRef}>Target</div>
      <button onClick={doRender}>Render</button>
    </>
  );
};
