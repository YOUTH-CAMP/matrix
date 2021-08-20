import React, { Suspense } from "react";
import { ConfigProvider, Spin } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import Layout from "./components/Layout/index";
import styles from "./App.module.less";
import { GlobalContext } from "./store";
import NavBar from "./components/Navbar";
import { useGlobalContext } from "./hooks/useGlobalContext";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { routes } from "./router";

function App(): JSX.Element {
  const globalContextValue = useGlobalContext();

  return (
    <ConfigProvider locale={zhCN}>
      <GlobalContext.Provider value={globalContextValue}>
        <div className={styles.container}>
          <Layout>
            <Router>
              {routes.map((route) => {
                return (
                  <Route key={route.path} path={route.path} exact={route.exact}>
                    {route.component}
                  </Route>
                );
              })}
            </Router>
          </Layout>
        </div>
      </GlobalContext.Provider>
    </ConfigProvider>
  );
}

export default App;
