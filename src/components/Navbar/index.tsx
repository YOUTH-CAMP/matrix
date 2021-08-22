import React, { ChangeEventHandler, useContext, useState } from "react";
import { PageHeader, Button, Input, message } from "antd";
import style from "./index.module.less";
import { Menu } from "antd";

const { Search } = Input;
import { SignIn } from "@/pages/components";
import { Link, useHistory } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { GlobalContext } from "@/store";
import UserMenu from "../UserMenu";
import { AppstoreOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;

const menuList = [
  { name: "首页", key: "1", path: "/" },
  // { name: "订阅", key: "2", path: "" },
  { name: "快讯", key: "3", path: "./news" },
];

function App(): JSX.Element {
  const history = useHistory();
  const { userInfo, logout } = useContext(GlobalContext);
  const [inputValue, setinputValue] = useState(decodeURIComponent(window.location.search.split('=')[1])??null)
  const jumpPage = (path: string) => {
    if (!path) {
      message.info("该功能正在开发中...");
      return;
    }
    history.push({ pathname: path });
  };
  const onSearch = (value: string) => window.location.href=`search?title=${encodeURIComponent(value)}`
  const onChange: React.ChangeEventHandler<HTMLInputElement> | undefined = (e) => {
    setinputValue(e.target.value)
  }
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
        <div className={style.menu}>
          <div style={{marginBottom:'50px',marginRight:'50px'}}>
            <Menu mode="inline" style={{ paddingLeft: "0px", position:'absolute',width:'100px'}}>
            <SubMenu key="sub1" icon={<AppstoreOutlined />}>
            <Menu.Item key="1" onClick={() => jumpPage(menuList[0].path)}>{menuList[0].name}</Menu.Item>
            <Menu.Item key="3" onClick={() => jumpPage(menuList[1].path)}>{menuList[1].name}</Menu.Item>
            </SubMenu>
              {/* <SubMenu key="sub1" icon={<AppstoreOutlined />}>
                {menuList.map((menu) => {
                  <Menu.Item key={menu.key} onClick={() => jumpPage(menu.path)}>
                    {menu.name}
                  </Menu.Item>;
                })}
              </SubMenu> */}
            </Menu>
          </div>
        </div>
        <div style={{paddingLeft:10}}>
          <Search
            placeholder="搜索您想要的标题关键字"
            onSearch={onSearch}
            value={inputValue}
            onChange={onChange}
            style={{ width: "300px" }}
          />
        </div>
        {/* <Button className={style.searchbutton}>
          <SearchOutlined />
        </Button> */}
      </div>

      <div className={style.logincenter}>
        {userInfo ? (
          <UserMenu
            userName={userInfo.account}
            dropList={[
              {
                title: "退出登录",
                onClick: () => {
                  logout();
                },
              },
            ]}
          />
        ) : (
          <SignIn />
        )}
      </div>
    </div>
  );
}

export default App;
