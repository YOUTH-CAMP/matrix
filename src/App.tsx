import React, { Suspense } from "react";
import { ConfigProvider, Spin } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import Layout from "./components/Layout/index";
import Home from "./pages/Home";
import styles from "./App.module.less";
import { GlobalContext, useGlobalContext } from "./store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import News from "./pages/news";

function App(): JSX.Element {
  const globalContextValue = useGlobalContext();

  return (
    <ConfigProvider locale={zhCN}>
      <GlobalContext.Provider value={globalContextValue}>
        <div className={styles.container}>
          <Router>
            <Layout>
              <Suspense fallback={<Spin />}>
                <Switch>
                  <Route path="/" exact>
                    \
                    <Home />
                  </Route>
                  <Route path="/news" exact>
                    <News />
                  </Route>
                </Switch>
              </Suspense>
            </Layout>
          </Router>
        </div>
      </GlobalContext.Provider>
    </ConfigProvider>
  );
}

export default App;
