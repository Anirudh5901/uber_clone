import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./context/UserContext.jsx";
import CaptainContext from "./context/CaptainContext.jsx";
import SocketProvider from "./context/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
  <CaptainContext>
    <UserContext>
      <SocketProvider>
        <BrowserRouter>
          <div className="h-screen w-full bg-black">
            <div className="h-screen max-w-lg mx-auto">
              <App />
            </div>
          </div>
        </BrowserRouter>
      </SocketProvider>
    </UserContext>
  </CaptainContext>
);
