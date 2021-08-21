import * as React from "react";
import { Row, Col } from "antd";
import style from "./ArticleCard.module.less";

type ArticleCardProps = {
  article: articleList;
};

const ArticleCard: React.FC<ArticleCardProps> = (props: ArticleCardProps) => {
  const { article } = props;
  return (
    <div className={style.articlebox}>
      <div className={style.articletitle}>
        <a href={article.url} target="_blank" rel="noreferrer">
          {article.title}
        </a>
      </div>
      <div className={style.articlelist}>
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
      <div className={style.articlefooter}></div>
    </div>
  );
};
export default ArticleCard;
