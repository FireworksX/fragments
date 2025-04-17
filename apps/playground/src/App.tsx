import "./App.css";
import { GlobalManager, Instance } from "@fragmentsx/render-react";
import { createGlobalManager } from "@fragmentsx/render-core";

const globalManager = createGlobalManager({
  apiToken:
    "2-534e0ddd2e09c836292ad94436463d45-2ba7423356013cae4bf0c06ab4e22f75ab743caa7367e1256f2ec599587f8c71",
});

window.globalManager = globalManager;
const url = new URL(window.location.href);
const nodeId = url.searchParams.get("node");

function App() {
  return (
    <GlobalManager value={globalManager}>
      <Instance fragmentId={+nodeId} />
    </GlobalManager>
  );
}

export default App;
