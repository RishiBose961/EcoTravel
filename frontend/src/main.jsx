import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import CreateNew from "./pages/CreateNew/CreateNew.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import Login from "./pages/Auth/Login/Login.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { NextUIProvider } from "@nextui-org/react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="" element={<PrivateRoute />}>
        <Route index={true} path="/" element={<Home />} />
        <Route path="/new" element={<CreateNew />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
     <QueryClientProvider client={queryClient}>
    <NextUIProvider>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </NextUIProvider>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </Provider>
);
