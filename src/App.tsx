import React from "react";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import styles from "./App.module.less";
import { SignIn } from "./pages/components";
import { GlobalContext, useGlobalContext } from "./store";

function App(): JSX.Element {
  const globalContextValue = useGlobalContext();

  return (
    <ConfigProvider locale={zhCN}>
      <GlobalContext.Provider value={globalContextValue}>
        <div className={styles.container}>
          <SignIn />
        </div>
      </GlobalContext.Provider>
    </ConfigProvider>
  );
}

export default App;
