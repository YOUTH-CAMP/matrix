import React, { useState } from "react";
import { Card, Space, Typography, BackTop, Image } from "antd";
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
              imageSrc={item.imageSrc}
              source={item.source}
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
  const { title, content, time, link, imageSrc, source } = props;
  const [imageFlag, setImageFlag] = useState(true);
  const date = new Date(time);
  const timeDisplay = `${date.getUTCMonth()}/${date.getUTCDate()} ${date.getUTCHours()}:${
    (date.getMinutes() < 10 ? "0" : "") + date.getMinutes()
  }`;

  const JumpToOrigin = () => {
    window.open(link, "_blank");
  };

  return (
    <Card
      className={styles.newsItem}
      bodyStyle={{ display: "flex" }}
      onClick={JumpToOrigin}
    >
      {imageSrc && imageFlag ? (
        <div
          style={{
            marginRight: "1rem",
            maxHeight: "0px",
            overflow: "hidden",
          }}
        >
          <Image
            width={200}
            src={imageSrc}
            preview={false}
            onError={() => {
              setImageFlag(false);
            }}
          />
        </div>
      ) : null}
      <div className={styles.newsContent}>
        <Typography.Title level={3}>{title}</Typography.Title>
        <p>{content}</p>
        <Typography.Text type="secondary">
          {source} {timeDisplay}
        </Typography.Text>
      </div>
    </Card>
  );
};

export default NewsList;
