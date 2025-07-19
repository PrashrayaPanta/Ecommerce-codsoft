import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@fortawesome/fontawesome-free/css/all.css";
import "./index.css";
import App from "./App.jsx";

import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";

import { Provider } from "react-redux";
import { store } from "./store";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>

    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      transition:Bounce
    />
  </StrictMode>
);
