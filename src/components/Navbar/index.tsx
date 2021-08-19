import React from "react";
import zhCN from "antd/lib/locale/zh_CN";
import { PageHeader, Tabs, Button, Statistic, Descriptions } from "antd";
import "./index.module.less";

function App(): JSX.Element {
  return (
    <div className="center">
      <div>
        <PageHeader
          extra={[<Button key="1">登录</Button>, <Button key="2">注册</Button>]}
        ></PageHeader>
      </div>

      <div>
        <PageHeader
          extra={[<Button key="1">登录</Button>, <Button key="2">注册</Button>]}
        ></PageHeader>
      </div>
    </div>
  );
}

export default App;
