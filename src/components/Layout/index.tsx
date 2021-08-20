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
      <NavBar />
      <Content>{children}</Content>
    </Layout>
  );
};

export default App;
