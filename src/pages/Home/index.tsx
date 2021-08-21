<<<<<<< HEAD
import React, { useState, FC, useEffect, useRef } from "react";
import { Tabs } from "antd";
import { useHistory } from "react-router";
import { Responsive, WidthProvider, Layout } from "react-grid-layout";
import "./style.css";
import { request } from "./../../utils/request";
import style from "./ArticleCard.module.less";
=======
import React, { useState, FC, useEffect, useRef, useContext } from "react";
import { Card, Col, Row, Tabs } from "antd";
import { useHistory } from "react-router";
import { Responsive, WidthProvider, Layout } from "react-grid-layout";
import "./style.css";
import pageInfo from "./all.json";
import { GlobalContext } from "@/store";
>>>>>>> dev

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const { TabPane } = Tabs;

interface Props {
  name?: string;
}

type listItem = {
  x: number;
  y: number;
  w: number;
  h: number;
  i: string;
}[];

type ArticleData = {
  success: boolean;
  data: Array<articleList>;
};

const Home: FC<Props> = ({ name = "Home" }: Props) => {
<<<<<<< HEAD
=======
  const {userInfo} = useContext(GlobalContext)
  console.log("page", pageInfo);
>>>>>>> dev
  const [EUlayout, setEUlayout] = useState<listItem>([]);
  const [articlesList, setArticlesList] = React.useState<articleList[]>([]);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  React.useEffect(() => {
    //获取用户首页卡片接口数据
    const fetchData = async () => {
      const res = (await request("articleList")) as ArticleData;
      setLoaded(res.success);
      setArticlesList(res.data);
      const newLayout: listItem = [];
      res.data.map((item) => {
        const newItem = {
          x: item.x,
          y: item.y,
          w: item.w,
          minW: 2,
          minH: 3,
          h: item.h,
          i: item.key,
        };
        newLayout.push(newItem);
      });
      setEUlayout(newLayout);
    };
    !loaded && fetchData();
  }, []);

  function callback(key: string) {
    console.log(key);
  }
  //存储拖拽移动的位置到缓存
  const onLayoutChange = (
    currentLayout: ReactGridLayout.Layout[],
    allLayouts: ReactGridLayout.Layouts
  ) => {
    console.log("currentLayout", currentLayout);
    console.log("allLayouts", allLayouts);
  };
  //拖拽完成后触发函数
  const onDrop: (layout: Layout[], item: Layout | null, e: Event) => void = (
    elemParams
  ) => {
    alert(`Element parameters: ${JSON.stringify(elemParams)}`);
  };
  return (
    <div className="justify-center" style={{ height: "100%", width: "100%" }}>
      {loaded && (
        <Tabs defaultActiveKey="1" onChange={callback} centered>
          <TabPane tab="全部" key="/">
            <div className="site-card-wrapper" style={{ padding: "0px 50px" }}>
              <ResponsiveReactGridLayout
                className="layout"
                layouts={{
                  lg: EUlayout,
                }}
                rowHeight={30}
                // isDraggable={false} //是否允许拖拽
                // isDroppable={false} //是否允许拖拽
                compactType="vertical"
                // useCSSTransforms={true} //性能优化
                // isResizable={false} //是否可以调整大小
                measureBeforeMount={false}
                cols={{ lg: 12, md: 12, sm: 6, xs: 4, xxs: 2 }}
                onLayoutChange={onLayoutChange}
                margin={[20, 20]}
              >
                {articlesList.map((item) => {
                  return (
                    <div key={item.key} className={style.articlebox}>
                      <div className={style.articletitle}>{item.title}</div>
                      <div className={style.articlelist}>
                        <ul>
                          {item.content.map((cItem, cIndex) => {
                            return (
                              <li key={item.key + cIndex}>{cItem.itemTitle}</li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </ResponsiveReactGridLayout>
            </div>
          </TabPane>
          <TabPane tab="科技" key="/senice">
            ddd
          </TabPane>
          <TabPane tab="开发" key="/develop">
            ccc
          </TabPane>
        </Tabs>
      )}
    </div>
  );
};

export default Home;
