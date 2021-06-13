import React from "react";
import ReactDOM from "react-dom";

import { MainPage } from "pages/main";

import "./index.css";
import { ReactQueryProvider } from "./queryClient";

if (process.env.NODE_ENV === "development") {
  const { worker } = await import("./mocks/browser");

  worker.start();
}

ReactDOM.render(
  <React.StrictMode>
    <ReactQueryProvider>
      <MainPage />
    </ReactQueryProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
