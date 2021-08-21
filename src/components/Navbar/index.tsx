import React from "react";
import { PageHeader, Button, Input, message } from "antd";
import style from "./index.module.less";
import { Menu } from "antd";

const { Search } = Input;
import { SignIn } from "@/pages/components";
import { useHistory } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;
const onSearch = (value: string) => console.log(value);

const menuList = [
  { name: "首页", key: "1", path: "/" },
  // { name: "订阅", key: "2", path: "" },
  { name: "快讯", key: "3", path: "./news" },
];

function App(): JSX.Element {
  const history = useHistory();
  const jumpPage = (path: string) => {
    if (!path) {
      message.info("该功能正在开发中...");
      return;
    }
    history.push({ pathname: path });
  };
  return (
    <div className={style.flexframe}>
      <div className={style.center}>
        <PageHeader title="Matrix" style={{ paddingRight: "0px" }} />
        <div className={style.buttonstyle}>
          {menuList.map((menu) => {
            return (
              <Button
                key={menu.key}
                style={{ border: "transparent", paddingLeft: "24px" }}
                onClick={() => jumpPage(menu.path)}
              >
                {menu.name}
              </Button>
            );
          })}
        </div>
        {/*<div className={style.buttonstyle2}>
          <Search
            placeholder="搜索您想要的模块"
            onSearch={onSearch}
            style={{ width: "300px" }}
          />
        </div>*/}
        <Button className={style.searchbutton}>
          <SearchOutlined />
        </Button>
      </div>

      <div className={style.logincenter}>
        <SignIn />
      </div>
    </div>
  );
};

export default App;
