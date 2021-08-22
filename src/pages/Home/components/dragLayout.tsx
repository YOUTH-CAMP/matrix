import React, { useEffect, useState, useContext } from "react";
import ReactGridLayout, {
  Responsive,
  WidthProvider,
  Layout,
} from "react-grid-layout";
import "../style.css";
import { request } from "../../../utils/request";
import { message, Spin } from "antd";
import { GlobalContext } from "../../../store";
import ArticleCard from './ArticleCard'
import load from "./load.module.less";
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
  const { userInfo, showSignInModal } = useContext(GlobalContext);
  const [EUlayout, setEUlayout] = useState<listItem[]>([]);
  const [articlesList, setArticlesList] = useState<articleList[]>([]);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const userId = userInfo?.id;
  const fetchData = async () => {
    const res = (await request("articleList")) as ArticleData;
    const LayoutRes = (await request("getLayout", {
      userId,
      classifyId,
    })) as LayoutData;
    if(classifyId === '全部')  { 
      setArticlesList(res.data); 
    } else {
      const NewArticlesList= res.data.filter(function(item){ return item.classify === classifyId})
      setArticlesList(NewArticlesList); 
    }
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
    setLoaded(true)
  };
  useEffect(() => {
    fetchData();
  }, [userInfo]);
  const checkLogin = async (e: Layout[]) => {
    if (!userInfo) return message.error("您还未进行登录，无法保存页面布局信息"),showSignInModal();
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
      {
        loaded? null: (<div className='width-full flex items-center justify-center'>
          <span className={load.loader}></span>
        </div>)
      }
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
        // resizeHandles={['sw','nw', 'se', 'ne']}
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
