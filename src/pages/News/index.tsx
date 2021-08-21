import React, { useEffect, useRef, useState } from "react";
import { Spin } from "antd";
import styles from "./index.module.less";
import { useRequest } from "@/hooks/useRequest";
import MessageList from "../components/NewsList";
import { INews } from "@/apis/news/interface";

const News: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [newsList, setNewsList] = useState<INews[]>([]);
  const newsListRef = useRef<HTMLDivElement>(null);
  const { loading, run } = useRequest("getNews", {
    manual: true,
  });

  useEffect(() => {
    run({ page }).then((res) => {
      setNewsList(res.data as INews[]);
    });
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
        run({ page }).then((res) => {
          console.log(page, res);
          setNewsList((newsList) => newsList.concat(res.data as INews[]));
        });
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
      {loading ? (
        <div className={styles.newsLoading}>
          <Spin />
        </div>
      ) : null}
    </>
  );
};

export default News;
