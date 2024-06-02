import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LoginWithFacebook from "./components/LoginWithFacebook";
import InstagramBusinessLogin from "./components/InstagramBusinessLogin";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
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
      <LoginWithFacebook appId="292351890511844" config_id="791585022693934" />
      <InstagramBusinessLogin
        client_id="292351890511844"
        redirect_uri="https://06d0-41-80-113-148.ngrok-free.app/callback"
      />
    </>
  );
}

export default App;
