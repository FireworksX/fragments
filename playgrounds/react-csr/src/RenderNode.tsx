import prepass from "react-ssr-prepass";
import { renderToString } from "react-dom/server";
import {
  useGlobalManager,
  GlobalManager,
  Area,
} from "@fragmentsx/render-react";
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
      <Area areaCode="596645ec098f6" options={{ ssr: true }} />
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
