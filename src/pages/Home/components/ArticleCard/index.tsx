import * as React from "react";
import { Row, Col, BackTop } from "antd";
import style from "./ArticleCard.module.less";
import { UpCircleOutlined } from "@ant-design/icons";

type ArticleCardProps = {
  article: articleList;
};

const ArticleCard: React.FC<ArticleCardProps> = (props: ArticleCardProps) => {
  const { article } = props;
  const listEl = React.useRef(null);
  return (
    <div className={style.articlebox}>
      <div className={style.articletitle}>
        <img
          style={{
            display: "inline-block",
            height: "40px",
            width: article.title == "微博" ? "40px" : "60px",
          }}
          src={article.logoImg}
        ></img>
        <a href={article.url} target="_blank" rel="noreferrer">
          {article.title}
        </a>
      </div>
      <div ref={listEl} className={style.articlelist}>
        <ul>
          {article.content.map((item, index: number) => (
            <li key={article.title + index}>
              <a href={item.href} target="_blank" rel="noreferrer">
                <Row>
                  <Col>
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "rgb(" + (255 - index * 5) + ",0," + index + ")",
                      }}
                    >
                      {index + 1}
                    </span>
                    <span>{"   " + item.itemTitle}</span>
                  </Col>
                </Row>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <BackTop
        className={style.backtop}
        target={() => {
          return listEl.current as unknown as Document;
        }}
        visibilityHeight={400}
      >
        <UpCircleOutlined
          style={{ color: "rgba(50, 50, 50, .5)", fontSize: "18px" }}
        />
      </BackTop>
      <div className={style.articlefooter}></div>
    </div>
  );
};

export default ArticleCard;
