import React from "react";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import Layout from "./components/Layout/index";
import Home from "./pages/Home";
import styles from "./App.module.less";
import { SignIn } from "./pages/components";
import { GlobalContext, useGlobalContext } from "./store";
import NavBar from "./components/Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import News from "./pages/News";

function App(): JSX.Element {
  const globalContextValue = useGlobalContext();

  return (
    <ConfigProvider locale={zhCN}>
      <GlobalContext.Provider value={globalContextValue}>
        <div className={styles.container}>
          <NavBar />
          <Layout>
            <Router>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/news" exact>
                <News />
              </Route>
            </Router>
          </Layout>
        </div>
      </GlobalContext.Provider>
    </ConfigProvider>
  );
}

export default App;
