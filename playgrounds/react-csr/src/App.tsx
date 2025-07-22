import { RenderNode } from "./RenderNode.tsx";
import { createFragmentsClient, ssrPlugin } from "@fragmentsx/client-core";
import { GlobalManager } from "@fragmentsx/render-react";
import { useEffect } from "react";
import { BaseRenderNode } from "./BaseRenderNode.tsx";

const globalManager = createFragmentsClient({
  apiToken:
    "1-f1b8febcd84b4482513888393a82cc99-8e026b36977ead522dfe698118b6f652d1bd8c1dd499bce4223835f356d18a72",
  isSelf: false,
});

globalManager.use(ssrPlugin);

function App() {
  useEffect(() => {
    window.globalManager = globalManager;
    window.getDocumentManager = () =>
      globalManager.resolve(globalManager.key).fragmentsManagers[+2];
  }, []);

  return (
    <GlobalManager value={globalManager}>
      <RenderNode />
      <hr />
      <BaseRenderNode />
    </GlobalManager>
  );
}

export default App;
