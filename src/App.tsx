import React from "react";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import styles from "./App.module.less";
import { request } from "./utils/request";
import { useRequest } from "./hooks/useRequest";
import News from "./pages/news";

function App(): JSX.Element {
  const { data, loading } = useRequest(async () =>
    request("articleClassifications")
  );

  console.log(data, loading);
  return (
    <ConfigProvider locale={zhCN}>
      <div className={styles.container}>
        <News />
      </div>
    </ConfigProvider>
  );
}

export default App;
