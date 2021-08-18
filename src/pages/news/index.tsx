import React, { useEffect, useState } from "react";
import { Card, Space, Typography } from "antd";
import styles from "./index.module.less";

export type NewsProps = {
  title: string;
  content: string;
  time: string;
  link: string;
};

const News: React.FC = () => {
  const [newsList, setNewsList] = useState<NewsProps[]>([]);

  useEffect(() => {
    Promise.resolve([
      {
        title: "恒邦股份：上半年净利2.33亿元 同比增74%\n",
        content:
          "恒邦股份公布2021年半年度报告，公司上半年实现营业收入约213.43亿元，同比增长29.78%；归属于上市公司股东的净利润约2.33亿元，同比增长73.93%；归属于上市公司股东的扣除非经常性损益的净利润约3.28亿元；基本每股收益0.20元。",
        time: "1 分钟前",
        link: "https://www.baidu.com",
      },
      {
        title: "恒邦股份：上半年净利2.33亿元 同比增74%\n",
        content:
          "恒邦股份公布2021年半年度报告，公司上半年实现营业收入约213.43亿元，同比增长29.78%；归属于上市公司股东的净利润约2.33亿元，同比增长73.93%；归属于上市公司股东的扣除非经常性损益的净利润约3.28亿元；基本每股收益0.20元。",
        time: "1 分钟前",
        link: "https://www.baidu.com",
      },
      {
        title: "恒邦股份：上半年净利2.33亿元 同比增74%\n",
        content:
          "恒邦股份公布2021年半年度报告，公司上半年实现营业收入约213.43亿元，同比增长29.78%；归属于上市公司股东的净利润约2.33亿元，同比增长73.93%；归属于上市公司股东的扣除非经常性损益的净利润约3.28亿元；基本每股收益0.20元。",
        time: "1 分钟前",
        link: "https://www.baidu.com",
      },
    ]).then((res) => {
      setNewsList(res);
    });
  }, []);

  return (
    <div className={styles.newsWrapper}>
      <Space direction={"vertical"} className={styles.newsContainer}>
        {newsList.map((item, index) => (
          <NewsItem
            key={index}
            title={item.title}
            content={item.content}
            time={item.time}
            link={item.link}
          />
        ))}
      </Space>
    </div>
  );
};

const NewsItem: React.FC<NewsProps> = (props: NewsProps) => {
  const { title, content, time, link } = props;

  const JumpToOrigin = () => {
    window.open(link, "_blank");
  };

  return (
    <Card className={styles.newsItem} onClick={JumpToOrigin}>
      <Typography.Title level={3}>{title}</Typography.Title>
      <p>{content}</p>
      <Typography.Text type="secondary">{time}</Typography.Text>
    </Card>
  );
};

export default News;
