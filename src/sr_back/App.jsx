import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

function App() {
  const [output, setOutputText] = useState("");
  const [input, setInputText] = useState("");

  async function tomato() {
    setOutputText(await invoke("run_tomato", { input }));
  }

  return (
    <div className="container">
      <h1>MiniTomato</h1>

      <div className="text-input">
        <div>
          <textarea
            id="order-input"
            onChange={(e) => setInputText(e.currentTarget.value)}
            placeholder="Enter tomato script..."
          />
        </div>
        <div className="exec-ui">
          <button type="button" onClick={() => tomato()}>
            実行
          </button>
        </div>
      </div>

      <div className="text-output">
        <p>{output}</p>
      </div>
    </div>
  );
}

export default App;
