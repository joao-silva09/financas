import React from "react";
import ReactDOM from "react-dom/client";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store from "./store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ProSidebarProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProSidebarProvider>
    </Provider>
  </React.StrictMode>
);
