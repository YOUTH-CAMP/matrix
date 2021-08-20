import React from "react";
import { Button, Input, Layout } from "antd";
import Nav from "../Nav";
import NavBar from "../Navbar";

const { Header, Content } = Layout;
const { Search } = Input;

interface Props {
  children: React.ReactNode;
}

const App = ({ children }: Props) => {
  const onSearch = (value: string) => console.log(value);
  return (
    <Layout className="min-h-screen flex bg-gray-50">
      {/* <Header className="w-full bg-white flex justify-between items-center">
        <div className="flex justify-center items-center">
          <Nav />
          <Search placeholder="搜索您想要的模块" onSearch={onSearch} />
        </div>
        <div className="flex justify-center items-center">
          <Button style={{ marginRight: 20 }}>登录</Button>
          <Button>注册</Button>
        </div>
      </Header> */}
      <NavBar />
      <Content>{children}</Content>
    </Layout>
  );
};

export default App;
