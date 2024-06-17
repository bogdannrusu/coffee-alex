/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { RouteObject } from "react-router";


const Home = lazy(() => import("pages/Home"));
const Goods = lazy(() => import("pages/GoodsNav"));
const Login = lazy(() => import("pages/LoginNav"));

const routes: RouteObject[] = [
    { path: "/", element: <Home /> },
    { path: "/goods", element: <Goods /> },
    { path: "/login", element: <Login /> }

    ];

export default routes;
