import React from "react";
import zhCN from "antd/lib/locale/zh_CN";
import { PageHeader, Tabs, Button, Statistic, Descriptions } from "antd";
import style from "./index.module.less";
import { AppstoreOutlined } from "@ant-design/icons";
import { Menu } from "antd";

const { SubMenu } = Menu;
const rootSubmenuKeys = ["sub1", "sub2", "sub4"];
const Sider = () => {
  const [openKeys, setOpenKeys] = React.useState(["sub1"]);
  const onOpenChange = (keys: any) => {
    const latestOpenKey = keys.find(
      (key: string) => openKeys.indexOf(key) === -1
    );
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
};

function App(): JSX.Element {
  return (
    <div className={style.flexframe}>
      <div className={style.center}>
        <PageHeader title="Matrix" style={{ paddingRight: "0px" }}></PageHeader>
        <div className={style.buttonstyle}>
          <Button>首页</Button>
          <Button>订阅</Button>
          <Button>快讯</Button>
        </div>
        <div className={style.menu}>
          <div>
            <Menu mode="inline" style={{ paddingLeft: "0px" }}>
              <SubMenu key="sub1" icon={<AppstoreOutlined />}>
                <Menu.Item key="1">首页</Menu.Item>
                <Menu.Item key="2">订阅</Menu.Item>
                <Menu.Item key="3">快讯</Menu.Item>
              </SubMenu>
            </Menu>
          </div>
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
