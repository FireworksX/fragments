import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { GlobalManager, Instance } from "@fragmentsx/render-react";
import { createGlobalManager } from "@fragmentsx/render-core";

const globalManager = createGlobalManager({
  apiToken:
    "2-534e0ddd2e09c836292ad94436463d45-2ba7423356013cae4bf0c06ab4e22f75ab743caa7367e1256f2ec599587f8c71",
});

window.globalManager = globalManager;

function App() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(235);

  return (
    <GlobalManager value={globalManager}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div style={{ display: "flex", gap: 15 }}>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <Instance
            fragmentId={4}
            props={{
              "74be4fd880a76": value,
            }}
          />
        ))}
      </div>

      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </GlobalManager>
  );
}

export default App;
