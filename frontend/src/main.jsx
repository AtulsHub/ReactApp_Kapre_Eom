import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Store, Home, Layout, Login } from "./components/index.js";
import Signup from "./components/Signup/Signup.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "store",
        element: <Store />,
      },
      {
        path: "men",
        element: <Store category={"men"} />,
      },
      {
        path: "women",
        element: <Store category={"women"} />,
      },
      {
        path: "children",
        element: <Store category={"children"} />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <StrictMode>
        
      </StrictMode>
    </RouterProvider>
  </Provider>
);
