import React from "react";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import Layout from "./components/Layout/index";
import Home from "./pages/Home";
import styles from "./App.module.less";
import { SignIn } from "./pages/components";
import { GlobalContext, useGlobalContext } from "./store";
import NavBar from "./components/Navbar";

function App(): JSX.Element {
  const globalContextValue = useGlobalContext();

  return (
    <ConfigProvider locale={zhCN}>
      <GlobalContext.Provider value={globalContextValue}>
        <div className={styles.container}>
          <Layout>
            <Home />
          </Layout>
        </div>
      </GlobalContext.Provider>
    </ConfigProvider>
  );
}

export default App;
