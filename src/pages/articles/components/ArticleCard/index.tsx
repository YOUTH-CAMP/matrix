/*
 * @Description: 资讯卡片基础布局样式
 * @Author: Lida
 * @Date: 2021-08-18 09:49:53
 * @LastEditors: Lida
 * @LastEditTime: 2021-08-19 22:16:47
 */
import * as React from "react";
import { Row, Col } from "antd";
import style from "./ArticleCard.module.less";

type ArticleCardProps = {
  article: ArticleList;
};

const ArticleCard: React.FC<ArticleCardProps> = (props: ArticleCardProps) => {
  const { article } = props;
  return (
    <div className={style.articlebox}>
      <div className={style.articletitle}>{article.name}</div>
      <div className={style.articlelist}>
        <ul>
          {article.articles.map((item, index: number) => (
            <li key={article.name + index}>
              <a href={item.href} target="_blank" rel="noreferrer">
                <span className={style.policiesline}></span>
                <Row>
                  <Col span={30}>
                    <span>{item.title}</span>
                  </Col>
                </Row>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className={style.articlefooter}>
        <span>
          {article.updatetime + "更新 - " + article.articlecount + "条"}
        </span>
      </div>
    </div>
  );
};

export default ArticleCard;
