import * as React from "react";
import { Row, Col, BackTop } from "antd";
import style from "./ArticleCard.module.less";
import { UpCircleOutlined  } from '@ant-design/icons';

type ArticleCardProps = {
  article: articleList;
};

const ArticleCard: React.FC<ArticleCardProps> = (props: ArticleCardProps) => {
  const { article } = props;
  const listEl = React.useRef(null);
  return (
    <div className={style.articlebox}>
      <div className={style.articletitle}>
      <img style={{display:"inline-block",height:"35px",width:article.title=="微博"?"35px":"60px"}} src={
        article.title=="微博"?
        "https://tse2-mm.cn.bing.net/th/id/OIP-C.zZ57V80mCw7QVbv3SAmkSgHaF_?pid=ImgDet&rs=1"
      :"https://i8.chinanews.com/2013/home/images/logo.jpg"}></img>
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
      <BackTop target={()=>listEl.current} visibilityHeight={400}>
        < UpCircleOutlined  className={style.backtop}/>
      </BackTop>
      </div>
      <div className={style.articlefooter}></div>
    </div>
  );
}

export default ArticleCard;