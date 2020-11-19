import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/all.min.css";
import "./assets/scss/index.scss";
import App from "./App";
import { LayoutProvider, PropertyProvider, UserProvider, QueryProvider } from "./contexts";
import { AppErrorBoundary } from "./components"
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    
    <UserProvider>
      <LayoutProvider>
        <PropertyProvider>
          <QueryProvider>
          <AppErrorBoundary>
             <App />
          </AppErrorBoundary>
          </QueryProvider>
        </PropertyProvider>
      </LayoutProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
