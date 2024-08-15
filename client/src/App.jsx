import { logError } from "./utils/logging.js";

import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// * Load environment variables from .env file
// import dotenv from "dotenv";
// dotenv.config();

function App() {
  const [users, setUsers] = useState(null);
  const [count, setCount] = useState(0);
  const [dataMessage, setDataMessage] = useState(null);

  // * Import server port
  const serverURL = import.meta.env.VITE_BASE_URL;
  const dataURL = `${serverURL}/api/data`;
  const userURL = `${serverURL}/api/user`;

  // * Initial server setup - data example
  const performFetch = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        logError(new Error("Network response was not ok."));
      }
      const responseMessage = await response.json();
      return responseMessage;
    } catch (error) {
      logError(new Error(error));
    }
  };

  useEffect(() => {
    const getDataMessage = async (url) => {
      const currentResponse = await performFetch(url);
      setDataMessage(currentResponse);
    };
    const getUsersData = async (url) => {
      const currentResponse = await performFetch(url);
      setUsers(currentResponse.result);
    };
    // ***** Use dataURL and userURL as argument
    getDataMessage(dataURL);
    getUsersData(userURL);
  }, [dataURL, userURL]);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Node</h1>
      <h2>{dataMessage ? dataMessage.message : "Loading..."}</h2>
      <h3>These are the users:</h3>
      <ul>
        {users &&
          users.map((user) => {
            return (
              <li key={user._id}>
                {user.name} {user.lastName} ({user.email})
              </li>
            );
          })}
      </ul>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

// * Test comment here
export default App;
