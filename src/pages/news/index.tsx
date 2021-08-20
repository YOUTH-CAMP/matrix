import React, { useEffect, useRef, useState } from "react";
import { Card, Space, Typography, Spin, BackTop } from "antd";
import styles from "./index.module.less";
import { useRequest } from "../../hooks/useRequest";

export type NewsProps = {
  title: string;
  content: string;
  time: string;
  link: string;
};

const News: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [newsList, setNewsList] = useState<NewsProps[]>([]);
  const newsListRef = useRef<HTMLDivElement>(null);
  const { loading, run } = useRequest("getNews", {
    manual: true,
  });

  useEffect(() => {
    run({ page }).then((res) => {
      setNewsList(res.data as NewsProps[]);
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
          setNewsList((newsList) => newsList.concat(res.data as NewsProps[]));
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
    <div className={styles.newsWrapper} ref={newsListRef}>
      <Space
        direction={"vertical"}
        className={styles.newsContainer}
        onScroll={() => {
          console.log(111);
        }}
      >
        {newsList.map((item, index) => (
          <NewsItem
            key={index}
            title={item.title}
            content={item.content}
            time={item.time}
            link={item.link}
          />
        ))}
        {loading ? (
          <div className={styles.newsLoading}>
            <Spin />
          </div>
        ) : null}
      </Space>
      <BackTop>
        <div className={styles.backTop}>UP</div>
      </BackTop>
    </div>
  );
};

const NewsItem: React.FC<NewsProps> = (props: NewsProps) => {
  const { title, content, time, link } = props;
  const date = new Date(time);
  const timeDisplay = `${date.getFullYear()}/${date.getUTCMonth()}/${date.getUTCDate()} ${date.getUTCHours()}:${
    (date.getMinutes() < 10 ? "0" : "") + date.getMinutes()
  }`;

  const JumpToOrigin = () => {
    window.open(link, "_blank");
  };

  return (
    <Card className={styles.newsItem} onClick={JumpToOrigin}>
      <Typography.Title level={3}>{title}</Typography.Title>
      <p>{content}</p>
      <Typography.Text type="secondary">{timeDisplay}</Typography.Text>
    </Card>
  );
};

export default News;
