import React from "react";
import { Card, Space, Typography, BackTop } from "antd";
import styles from "./index.module.less";
import { INews, INewsList } from "@/apis/news/interface";

const NewsList = React.forwardRef(
  (props: INewsList, ref?: React.Ref<HTMLHeadingElement>) => {
    const { messageList } = props;

    return (
      <div className={styles.newsWrapper} ref={ref}>
        <Space direction={"vertical"} className={styles.newsContainer}>
          {messageList.map((item, index) => (
            <NewsItem
              key={index}
              title={item.title}
              content={item.content}
              time={item.time}
              link={item.link}
            />
          ))}
        </Space>
        <BackTop>
          <div className={styles.backTop}>UP</div>
        </BackTop>
      </div>
    );
  }
);

NewsList.displayName = "NewsList";

const NewsItem: React.FC<INews> = (props: INews) => {
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

export default NewsList;
