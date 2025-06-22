import { RenderNode } from "./RenderNode.tsx";
import { createFragmentsClient, ssrPlugin } from "@fragmentsx/client-core";
import { GlobalManager } from "@fragmentsx/render-react";
import { useEffect } from "react";

const globalManager = createFragmentsClient({
  apiToken:
    "2-c27ab3aa225aa808f17bd6533bad353a-c2741dc2d86797e13f00efe902d6211fe7d07d0f5a6ef3c65ab1424ea5d6b8b8",
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
    </GlobalManager>
  );
}

export default App;
