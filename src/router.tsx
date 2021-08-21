import React, { ReactElement } from "react";
import Home from "./pages/Home";
import News from "./pages/News";

interface IRouter {
  path: string;
  component: ReactElement;
  exact: boolean;
}

export const routes: IRouter[] = [
  {
    path: "/",
    component: <Home />,
    exact: true,
  },
  {
    path: "/news",
    component: <News />,
    exact: true,
  },
];
