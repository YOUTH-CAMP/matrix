import React, { ReactElement } from "react";
interface IRouter {
  path: string;
  component: ReactElement;
  exact: boolean;
}

import Home from "./pages/Home";
import News from "./pages/news";

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
