import React, { useState } from "react";
import { ConfigProvider, Button, Row, Col } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import "./App.less";
import Layout from "./components/Layout/index";

function App(): JSX.Element {
  const [count, setCount] = useState(0);

  return (
    <ConfigProvider locale={zhCN}>
      <div className="App">
        <Layout></Layout>
      </div>
    </ConfigProvider>
  );
}

export default App;
