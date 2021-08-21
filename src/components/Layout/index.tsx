import React from "react";
import { Button, Input, Layout } from "antd";
import NavBar from "../Navbar";
import { relative } from "path/posix";

const { Header, Content } = Layout;
const { Search } = Input;

interface Props {
  children: React.ReactNode;
}

const App = ({ children }: Props) => {
  const onSearch = (value: string) => console.log(value);
  return (
    <Layout className="min-h-screen flex bg-gray-50">
      <div>
        <NavBar />
      </div>
      <div style={{ height: "75px" }}></div>
      <div>
        <Content>{children}</Content>
      </div>
    </Layout>
  );
};

export default App;
