import React from "react";
import { Button, Input, Layout } from "antd";
import Navbar from "../Navbar";

const { Header, Content } = Layout;
const { Search } = Input;

interface Props {
  children: React.ReactNode;
}

const App = ({ children }: Props) => {
  const onSearch = (value: string) => console.log(value);
  return (
    <Layout className="min-h-screen flex bg-gray-50">
      <Header className="w-full bg-white flex justify-between items-center">
        <Navbar />
      </Header>
      <Content>{children}</Content>
    </Layout>
  );
};

export default App;
