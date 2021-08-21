import React, { useState, FC, useEffect, useRef } from "react";
import { Alert, message, Tabs } from "antd";
import { useHistory } from "react-router";
import DragLayout from "./dragLayout";
import { request } from "./../../utils/request";

const { TabPane } = Tabs;

interface Props {
  name?: string;
}
type ArticleClassifyItem = {
  name: string;
  id: number;
};
type ArticleClassify = {
  success: boolean;
  data: Array<ArticleClassifyItem>;
};
const Home: FC<Props> = ({ name = "Home" }: Props) => {
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const userId = "611e169c488e2ad6005c98fd";
  const [TabData, setTabData] = useState<ArticleClassifyItem[]>([]);
  const classifyId = "全部";
  React.useEffect(() => {
    //获取用户首页卡片接口数据
    const fetchData = async () => {
      const res = (await request("articleClassifications")) as ArticleClassify;
      setLoaded(res.success);
      setTabData(res.data);
    };
    !loaded && fetchData();
  }, []);

  function callback(key: string) {
    console.log(key);
  }
  return (
    <div className="justify-center" style={{ height: "100%", width: "100%" }}>
      {loaded && (
        <Tabs defaultActiveKey="1" onChange={callback} centered>
          {TabData.map((item, index) => {
            return (
              <TabPane tab={item.name} key={index}>
                <DragLayout classifyId={item.name} />
              </TabPane>
            );
          })}
        </Tabs>
      )}
    </div>
  );
};

export default Home;
