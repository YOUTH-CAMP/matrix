import React from "react";
import zhCN from "antd/lib/locale/zh_CN";
import { PageHeader, Tabs, Button, Statistic, Descriptions } from "antd";
import style from "./index.module.less";
//import HeaderSearch from 'ant-design-pro/lib/HeaderSearch';

function App(): JSX.Element {
  return (
    <div className={style.flexframe}>
      <div className={style.center}>
        <PageHeader title="Matrix"></PageHeader>
        <div className={style.buttonstyle}>
          <Button>首页</Button>
          <Button>订阅</Button>
          <Button>快讯</Button>
        </div>
      </div>
      {/* <HeaderSearch
                placeholder="站内搜索"
                dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
                // onSearch={value => {
                //     console.log('input', value); // eslint-disable-line
                // }}
                // onPressEnter={value => {
                //     console.log('enter', value); // eslint-disable-line
                // }}
            /> */}

      <div className={style.center}>
        <PageHeader
          extra={[<Button key="1">登录</Button>, <Button key="2">注册</Button>]}
        ></PageHeader>
      </div>
    </div>
  );
}

export default App;
