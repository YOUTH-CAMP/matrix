import React, { useState, FC, useEffect, useRef } from "react";
import { Alert, message, Tabs } from "antd";
import { useHistory } from "react-router";
import ReactGridLayout, {
  Responsive,
  WidthProvider,
  Layout,
} from "react-grid-layout";
import "./style.css";
import { request } from "./../../utils/request";
import style from "./ArticleCard.module.less";

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
};

type ArticleData = {
  success: boolean;
  data: Array<articleList>;
};

type LayoutData = {
  success: boolean;
  data: Array<listItem>;
};

const Home: FC<Props> = ({ name = "Home" }: Props) => {
  const [EUlayout, setEUlayout] = useState<listItem[]>([]);
  const [articlesList, setArticlesList] = React.useState<articleList[]>([]);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const userId = "611e169c488e2ad6005c98fd";
  const classifyId = "全部";
  React.useEffect(() => {
    //获取用户首页卡片接口数据
    const fetchData = async () => {
      const res = (await request("articleList")) as ArticleData;
      const LayoutRes = (await request("getLayout", {
        userId,
        classifyId,
      })) as LayoutData;
      setLoaded(res.success);
      setArticlesList(res.data);
      const newLayout: listItem[] = [];
      LayoutRes.data.map((item) => {
        const newItem = {
          x: item.x,
          y: item.y,
          w: item.w,
          minW: 2,
          minH: 3,
          h: item.h,
          i: item.i,
        };
        newLayout.push(newItem);
      });
      console.log(newLayout);
      setEUlayout(newLayout);
    };
    !loaded && fetchData();
  }, []);

  function callback(key: string) {
    console.log(key);
  }
  //存储拖拽移动的位置到缓存
  // const onLayoutChange = async (
  //   currentLayout: ReactGridLayout.Layout[],
  //   allLayouts: ReactGridLayout.Layouts
  // ) => {
  //   // const upDateLayout:listItem[] = []
  //   // currentLayout.map(item=>{
  //   //   upDateLayout.push({
  //   //     'x': item.x,
  //   //     'y': item.y,
  //   //     'w': item.w,
  //   //     'h': item.h,
  //   //     'i': item.i,
  //   //   })
  //   // })
  //   // const saveLayout = (await request("saveLayout",{
  //   //   coordinateInfo: JSON.stringify(upDateLayout),
  //   //   userId,
  //   //   classifyId,
  //   // }))
  //   // message.info(saveLayout.message);
  //   // console.log(saveLayout);
  //   console.log("currentLayout", currentLayout);
  //   console.log("allLayouts", allLayouts);
  // };
  //拖拽完成后触发函数
  const onDrop: (layout: Layout[], item: Layout | null, e: Event) => void = (
    elemParams
  ) => {
    alert(`Element parameters: ${JSON.stringify(elemParams)}`);
  };
  const onDragStop = async (e: Layout[]) => {
    console.log(e);
    const saveLayout = await request("saveLayout", {
      coordinateInfo: JSON.stringify(e),
      userId,
      classifyId,
    });
    message.info(saveLayout.message);
  };
  const onResizeStop = async (e: Layout[]) => {
    console.log(e);
    const saveLayout = await request("saveLayout", {
      coordinateInfo: JSON.stringify(e),
      userId,
      classifyId,
    });
    message.info(saveLayout.message);
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
                // onLayoutChange={onLayoutChange}
                onDrop={onDrop}
                onDragStop={onDragStop}
                onResizeStop={onResizeStop}
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
