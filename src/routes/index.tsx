/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Home = lazy(() => import("pages/Home"));
const Goods = lazy(() => import("pages/GoodsNav"));
const Login = lazy(() => import("pages/LoginNav"));
const Wp = lazy(() => import("pages/WpNav"));
const Orders = lazy(() => import("pages/OrdersNav"));

const routes: RouteObject[] = [
    { path: "/", element: <Home /> },
    { path: "/goods", element: <Goods /> },
    { path: "/login", element: <Login /> },
    { path: "/wp", element: <Wp /> },
    { path: "/orders", element: <Orders /> }
];

export default routes;
