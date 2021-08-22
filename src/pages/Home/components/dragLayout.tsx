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
  const { userInfo, showSignInModal,  } = useContext(GlobalContext);
  const [EUlayout, setEUlayout] = useState<listItem[]>([]);
  const [articlesList, setArticlesList] = useState<articleList[]>([]);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const locationLayout = localStorage.getItem(`MaxtrixLayout${classifyId}`)
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
    let newLayout = getLayoutData(LayoutRes)
    if(!userId) { //未登录
      if(locationLayout) newLayout = JSON.parse(locationLayout);
      //未登录且未有本地存储数据的时候
      setEUlayout(newLayout)
    } else { //登录
      if(locationLayout) checkLogin(JSON.parse(locationLayout),'synchronism'); //本地数据上传至服务器
      setEUlayout(newLayout)
    }
    setEUlayout(newLayout);
    setLoaded(true);
    localStorage.setItem(`MaxtrixLayout${classifyId}`, JSON.stringify(newLayout))
  };

  const getLayoutData = (data: LayoutData) =>{
    const newLayout: listItem[] = [];
    data.data.map((item) => {
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
    return newLayout
  }
  useEffect(() => {
    fetchData();
  }, [userInfo]);
  const checkLogin = async (e: Layout[], type?:string) => {
    if (!userInfo) return localStorage.setItem(`MaxtrixLayout${classifyId}`,JSON.stringify(e));
    const saveLayout = await request("saveLayout", {
      coordinateInfo: JSON.stringify(e),
      userId,
      classifyId,
    });
    if(type==='synchronism') message.info(saveLayout.message);
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
        onDragStop={onDragStop}
        onResizeStop={onResizeStop}
        margin={[20, 20]}
      >
        {articlesList.map((item) => {
          return (
            <div
              key={item.key}
              onClick={(e)=>{e.preventDefault()}}
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
