import React, { useState, FC, useEffect, useRef } from "react";
import { Card, Col, Row, Tabs } from "antd";
import { useHistory } from "react-router";
import { Responsive, WidthProvider, Layout } from "react-grid-layout";
import "./style.css";
import pageInfo from "./all.json";

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const { TabPane } = Tabs;

interface Props {
  name?: string;
}
type articleList = {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  key: string;
  url: string;
  content: {
    itemTitle: string;
    itemContent: string;
  }[];
};

type listItem = {
  x: number;
  y: number;
  w: number;
  h: number;
  i: string;
}[];

const Home: FC<Props> = ({ name = "Home" }: Props) => {
  console.log("page", pageInfo);
  const [EUlayout, setEUlayout] = useState<listItem>([]);
  useEffect(() => {
    const newLayout: listItem = [];
    pageInfo.pageInfo.map((item) => {
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
              {pageInfo.pageInfo.map((item) => {
                // return (
                //   <Card
                //     title={item.title}
                //     bordered={false}
                //     key={item.key}
                //     style={{ width: 300 }}
                //   >
                //     <p>Card content</p>
                //     <p>Card content</p>
                //     <p>Card content</p>
                //   </Card>
                // );
                return (
                  <div
                    key={item.key}
                    className="flex justify-content border-gray-300	w-full h-full flex-col rounded border-2"
                  >
                    <div className="h-1/4 px-8 flex items-center border-gray-300 border-b-2 text-base">
                      {item.title}
                    </div>
                    <ul
                      style={{
                        display: "flex",
                        flex: 1,
                        flexDirection: "column",
                      }}
                    >
                      {item.content.map((cItem, cIndex) => {
                        return (
                          <li
                            className="h-1/4 px-8 flex items-center border-gray-100 border-b-2 text-xs"
                            key={item.key + cIndex}
                          >
                            {cItem.itemTitle}
                          </li>
                        );
                      })}
                    </ul>
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
    </div>
  );
};

export default Home;
