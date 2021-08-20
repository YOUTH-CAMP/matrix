import React from "react";
import zhCN from "antd/lib/locale/zh_CN";
import { PageHeader, Tabs, Button, Statistic, Descriptions, Input } from "antd";
import style from "./index.module.less";
import { AppstoreOutlined } from "@ant-design/icons";
import { Menu } from "antd";
const { Search } = Input;
import { SignIn } from "../../pages/components/SignIn/index";
import { useHistory } from "react-router-dom";

const { SubMenu } = Menu;
const rootSubmenuKeys = ["sub1", "sub2", "sub4"];
const onSearch = (value: string) => console.log(value);
// const directToNews = () => {
//   history.push('./news');

// }

function App(): JSX.Element {
  const history = useHistory();

  const onMain = () => {
    history.push({ pathname: "/" });
  };

  const onNews = () => {
    history.push({ pathname: "./news" });
  };

  return (
    <div className={style.flexframe}>
      <div className={style.center}>
        <PageHeader title="Matrix" style={{ paddingRight: "0px" }}></PageHeader>
        <div className={style.buttonstyle}>
          <Button onClick={onMain}>首页</Button>
          <Button>订阅</Button>
          <Button onClick={onNews}>快讯</Button>
        </div>
        <div className={style.menu}>
          <div>
            <Menu mode="inline" style={{ paddingLeft: "0px" }}>
              <SubMenu key="sub1" icon={<AppstoreOutlined />}>
                <Menu.Item key="1" onClick={onMain}>
                  首页
                </Menu.Item>
                <Menu.Item key="2">订阅</Menu.Item>
                <Menu.Item key="3" onClick={onNews}>
                  快讯
                </Menu.Item>
              </SubMenu>
            </Menu>
          </div>
        </div>
        <div className={style.buttonstyle}>
          <Search placeholder="搜索您想要的模块" onSearch={onSearch} />
        </div>
      </div>

      <div className={style.logincenter}>
        {/* <PageHeader
          extra={[<Button key="1">登录</Button>, <Button key="2">注册</Button>]}
        > */}
        <SignIn />
        {/* </PageHeader> */}
      </div>
    </div>
  );
}

export default App;
