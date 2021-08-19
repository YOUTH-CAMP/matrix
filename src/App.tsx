import React, { useState } from "react";
import { ConfigProvider, Button, Row, Col } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import styles from "./App.module.less";
import { request } from "./utils/request";
import { useRequest } from "./hooks/useRequest";
import NavBar from "./components/Navbar";

function App(): JSX.Element {
  const { data, loading } = useRequest(async () =>
    request("articleClassifications")
  );

  async function test() {
    const res = await request("articleClassifications");
    console.log(res);
  }
  console.log(data, loading);
  return (
    <ConfigProvider locale={zhCN}>
      {/* <div className={styles.container}>
        <Row>
          <Col> */}
      <NavBar />
      {/* </Col>
        </Row>
      </div> */}
    </ConfigProvider>
  );
}

export default App;
