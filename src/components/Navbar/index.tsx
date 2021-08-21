import React from "react";
import zhCN from "antd/lib/locale/zh_CN";
import { PageHeader, Tabs, Button, Statistic, Descriptions, Input } from "antd";
import style from "./index.module.less";
import { AppstoreOutlined } from "@ant-design/icons";
import { Menu } from "antd";
const { Search } = Input;
import { SignIn } from "../../pages/components/SignIn/index";
import { useHistory } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;
const onSearch = (value: string) => console.log(value);
const menuList = [
  { name: "首页", key: "1", path: "/" },
  { name: "订阅", key: "2", path: "/xxx" },
  { name: "快讯", key: "3", path: "./news" },
];

function App(): JSX.Element {
  const history = useHistory();
  const jumpPage = (path: string) => {
    if (path === "/") history.push({ pathname: path });
    else if (path === "./news") history.push({ pathname: path });
  };
  return (
    <div className={style.flexframe}>
      <div className={style.center}>
        <PageHeader title="Matrix" style={{ paddingRight: "0px" }}></PageHeader>
        <div className={style.buttonstyle}>
          <Button
            onClick={() => jumpPage("/")}
            style={{ border: "transparent", paddingLeft: "24px" }}
          >
            首页
          </Button>
          <Button style={{ border: "transparent", paddingLeft: "24px" }}>
            订阅
          </Button>
          <Button
            onClick={() => jumpPage("./news")}
            style={{ border: "transparent", paddingLeft: "24px" }}
          >
            快讯
          </Button>
        </div>
        <div className={style.menu}>
          <div>
            <Menu mode="inline" style={{ paddingLeft: "0px" }}>
              <SubMenu key="sub1" icon={<AppstoreOutlined />}>
                {menuList.map((menu) => {
                  <Menu.Item key={menu.key} onClick={() => jumpPage(menu.path)}>
                    {menu.name}
                  </Menu.Item>;
                })}
              </SubMenu>
            </Menu>
          </div>
        </div>
        <div className={style.buttonstyle2}>
          <Search
            placeholder="搜索您想要的模块"
            onSearch={onSearch}
            style={{ width: "300px" }}
          />
        </div>
        <Button className={style.searchbutton}>
          <SearchOutlined />
        </Button>
      </div>

      <div className={style.logincenter}>
        <SignIn />
      </div>
    </div>
  );
}

export default App;
