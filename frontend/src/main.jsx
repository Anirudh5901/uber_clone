import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./context/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContext>
      <BrowserRouter>
        <div className="h-screen w-full bg-black">
          <div className="h-[667px] w-[375px] mx-auto">
            <App />
          </div>
        </div>
      </BrowserRouter>
    </UserContext>
  </StrictMode>
);
