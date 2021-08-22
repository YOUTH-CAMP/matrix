import React, { useEffect, useRef, useState } from "react";
import { message, Spin } from "antd";
import styles from "./index.module.less";
import MessageList from "../components/NewsList";
import { INews } from "@/apis/news/interface";
import { request } from "@/utils/request";
type  searchNews = {
  data: Array<INews>,
  success: boolean
}
const News: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [newsList, setNewsList] = useState<INews[]>([]);
  const newsListRef = useRef<HTMLDivElement>(null);
  const [loading, setloading] = useState(false)
  const value = decodeURIComponent(window.location.search.split('=')[1])
  const getSearch = async () =>{
    const res = await request("getSearchNews", { page,search: value }) as searchNews
    setNewsList((newsList) => newsList.concat(res.data as INews[]));
    setloading(res.success)
  }
  useEffect(() => {
    getSearch();
  }, []);
  const trackScrolling = () => {
    if (newsListRef.current) {
      if (
        newsListRef.current.getBoundingClientRect().bottom <=
        window.innerHeight + 10
      ) {
        document.removeEventListener("scroll", trackScrolling);
        console.log("header bottom reached");
        setPage((page) => page + 1);
        getSearch();         
      }
    }
  };

  useEffect(() => {
    if (!loading) {
      document.addEventListener("scroll", trackScrolling);
      return () => {
        document.removeEventListener("scroll", trackScrolling);
      };
    }
  });

  return (
    <>
      <MessageList messageList={newsList} ref={newsListRef} />
      {!loading ? (
        <div className={styles.newsLoading}>
          <Spin />
        </div>
      ) : <div className='width-full flex justify-center items-center padding-tb text-gray-400 my-2	'>暂无数据</div>}
    </>
  );
};

export default News;
