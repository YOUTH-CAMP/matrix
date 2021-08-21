import React, { useEffect, useState, useContext } from "react";
import ReactGridLayout, {
  Responsive,
  WidthProvider,
  Layout,
} from "react-grid-layout";
import "./style.css";
import style from "./ArticleCard.module.less";
import { request } from "./../../utils/request";
import { message } from "antd";
import { GlobalContext } from "../../store";
import ArticleCard from './components/ArticleCard'

const ResponsiveReactGridLayout = WidthProvider(Responsive);
type listItem = {
  x: number;
  y: number;
  w: number;
  h: number;
  i: string;
};
type LayoutData = {
  success: boolean;
  data: Array<listItem>;
};
type ArticleData = {
  success: boolean;
  data: Array<articleList>;
};
interface Props {
  classifyId?: string;
}
const DragLayout = ({ classifyId }: Props) => {
  const { userInfo } = useContext(GlobalContext);
  const [EUlayout, setEUlayout] = useState<listItem[]>([]);
  const [articlesList, setArticlesList] = useState<articleList[]>([]);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const userId = userInfo?.id;
  console.log(userInfo, userId);
  useEffect(() => {
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
      setEUlayout(newLayout);
    };
    !loaded && fetchData();
  }, []);
  const checkLogin = async (e: Layout[]) => {
    if (!userInfo) return message.error("您还未进行登录，无法配置页面信息");
    const saveLayout = await request("saveLayout", {
      coordinateInfo: JSON.stringify(e),
      userId,
      classifyId,
    });
    message.info(saveLayout.message);
  };
  const onDragStop = async (e: Layout[]) => {
    checkLogin(e);
  };
  const onResizeStop = async (e: Layout[]) => {
    checkLogin(e);
  };
  return (
    <div className="site-card-wrapper" style={{ padding: "0px 50px" }}>
      <ResponsiveReactGridLayout
        // className="layout"
        layouts={{
          lg: EUlayout,
        }}
        rowHeight={30}
        // isDraggable={false} //是否允许拖拽
        // isDroppable={false} //是否允许拖拽
        compactType="vertical"
        useCSSTransforms={true} //性能优化
        // isResizable={false} //是否可以调整大小
        measureBeforeMount={false}
        cols={{ lg: 12, md: 12, sm: 6, xs: 4, xxs: 2 }}
        // onLayoutChange={onLayoutChange}
        onDragStop={onDragStop}
        onResizeStop={onResizeStop}
        margin={[20, 20]}
      >
        {articlesList.map((item) => {
          return (
            <div
              key={item.key}
              className="flex justify-content w-full h-full flex-col"
            >
              <ArticleCard article={item} />
            </div>
          );
        })}
      </ResponsiveReactGridLayout>
    </div>
  );
};
export default DragLayout;
