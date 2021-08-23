import React, { useState, FC, useEffect, useRef } from "react";
import { Tabs } from "antd";
import DragLayout from "./components/dragLayout";
import { request } from "@/utils/request";
import { RollList } from "@/pages/components";
import styles from "./index.module.less";
import isMobile from "@/utils/isMobile";

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
  const [TabData, setTabData] = useState<ArticleClassifyItem[]>([]);
  const contentEl = useRef<any>(null);
  const [rollListHeight, setRollListHeight] = useState(500);

  useEffect(() => {
    if (!contentEl.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      setRollListHeight(entries[0].target.clientHeight);
    });
    resizeObserver.observe(contentEl.current);
  }, [contentEl.current]);

  React.useEffect(() => {
    //获取用户首页卡片接口数据
    const fetchData = async () => {
      const res = (await request("articleClassifications")) as ArticleClassify;
      setLoaded(res.success);
      setTabData(res.data);
    };
    !loaded && fetchData();
  }, []);

  return (
    <div style={{ display: "flex", height: "100%", width: "100%", flexDirection: isMobile()? 'column':'row'}} >
       <div
        className='justify-center items-center'
        style={{
          width:  "100%",
          padding: "0 32px",
          height: "200px",
          flexDirection: 'column',
          display: isMobile()?'inline-flex':'none',
        }}
      >
        {/* <div className ={styles.header}> */}
        <div className='flex justify-center items-center' 
          style={{
            backgroundColor: '#f0f0f0', 
            textAlign:'center',
            height:40,
            color: '#141414',
            width:'100%',
            fontSize:18,
            fontWeight: 'bold'
          }}>
        快讯为您推荐中...
        </div>
        <RollList />
      </div>
      <div className="justify-center" style={{ flex: "1 1" }} ref={contentEl}>
        {loaded && (
          <Tabs defaultActiveKey="1" centered className={styles.tabs}>
            {TabData.map((item, index) => {
              return (
                <TabPane tab={item.name} key={item.id}>
                  <DragLayout classifyId={item.name} />
                </TabPane>
              );
            })}
          </Tabs>
        )}
      </div>
      <div
        className='justify-center items-center'
        style={{
          width: "364px",
          padding: "0 32px",
          height: `${rollListHeight}px`,
          display: !isMobile()?'inline-flex':'none',
          flexDirection: 'column'
        }}
      >
        <div className='flex justify-center items-center' 
          style={{
            backgroundColor: '#f0f0f0', 
            textAlign:'center',
            color: '#141414',
            height:40,
            width:'100%',
            fontSize:18,
            fontWeight: 'bold'
          }}>
        快讯为您推荐中...
        </div>
        <RollList />
      </div>
    </div>
  );
};

export default Home;
