import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./App.css";
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
import IndividualHotels from "./pages/IndividualAll/IndividualHotels.jsx";
import Register from "./pages/Auth/Register/Register.jsx";
import IndividualTravels from "./pages/IndividualAll/IndividualTravels.jsx";
import FuelMap from "./pages/FuelMap/FuelMap.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register/>}/>
      <Route path="" element={<PrivateRoute />}>
        <Route index={true} path="/" element={<Home />} />
        <Route path="/new" element={<CreateNew />} />
        <Route path="/hotels/:id" element={<IndividualHotels/>} />
        <Route path="/travels/:id" element={<IndividualTravels/>} />
        <Route path="/maps" element={<FuelMap/>}/>
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
