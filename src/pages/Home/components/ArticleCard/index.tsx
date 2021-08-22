import * as React from "react";
import { Row, Col, BackTop } from "antd";
import style from "./ArticleCard.module.less";
import { UpCircleOutlined  } from '@ant-design/icons';


type ArticleCardProps = {
  article: articleList;
};

const calcTime=function(t:string){
  const nowTime = new Date();
  const articleTime = new Date(t);
  const ago = nowTime.getTime()- articleTime.getTime();
  const days = Math.floor(ago/(24*3600*1000));
  const leave1 = ago % (24*3600*1000);
  const hours = Math.floor(leave1/(3600*1000));
  const leave2 = leave1 % (3600*1000);
  const minutes = Math.floor(leave2/(60*1000));
  console.log(days?days+"天":"") + (hours?hours+"小时":"") + (minutes?minutes+"分钟":"")
  return (days?days+"天":"") + (hours?hours+"小时":"") + (minutes?minutes+"分钟":"");
}

const ArticleCard: React.FC<ArticleCardProps> = (props: ArticleCardProps) => {
  const { article } = props;
  const listEl = React.useRef(null);
  return (
    <div className={style.articlebox}>
      <div className={style.articletitle}>
      <img style={{display:"inline-block",height:"40px",width:article.title=="微博"?"40px":"60px"}} src={
        article.logoImg}></img>
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
      <BackTop className={style.backtop} target={()=>listEl.current} visibilityHeight={400}>
        < UpCircleOutlined style={{color: "rgba(50, 50, 50, .5)",fontSize: "18px"}}/>
      </BackTop>
      <div className={style.articlefooter}>
        <span>{calcTime(article.updateTime)+"前更新"}</span>
      </div>
    </div>
  );
}

export default ArticleCard;