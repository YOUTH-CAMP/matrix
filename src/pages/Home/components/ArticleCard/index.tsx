import * as React from "react";
import { Row, Col, BackTop } from "antd";
import style from "./ArticleCard.module.less";
import { UpCircleOutlined  } from '@ant-design/icons';


type ArticleCardProps = {
  article: articleList;
};

const utc2beijing=function (utc_datetime:string) {
  // 转为正常的时间格式 年-月-日 时:分:秒
  var T_pos = utc_datetime.indexOf('T');
  var Z_pos = utc_datetime.indexOf('Z');
  var year_month_day = utc_datetime.substr(0,T_pos);
  var hour_minute_second = utc_datetime.substr(T_pos+1,Z_pos-T_pos-1);
  var new_datetime = year_month_day+" "+hour_minute_second; // 2017-03-31 08:02:06
  
  // 处理成为时间戳
  let timestamp = new Date(Date.parse(new_datetime));
  let timestamp1 = timestamp.getTime();
  let timestamp2 = timestamp1/1000;

  // 增加8个小时，北京时间比utc时间多八个时区
  let timestamp3 = timestamp2+8*60*60;

  // 时间戳转为时间
  var beijing_datetime = new Date(parseInt(timestamp3) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
  return beijing_datetime; // 2017-03-31 16:02:06
} 

const calcTime=function(t:string){
  let nowTime = new Date();
  let articleTime = new Date(t);
  let ago = nowTime.getTime()- articleTime.getTime();
  let days = Math.floor(ago/(24*3600*1000));
  let leave1 = ago % (24*3600*1000);
  let hours = Math.floor(leave1/(3600*1000));
  let leave2 = leave1 % (3600*1000);
  let minutes = Math.floor(leave2/(60*1000));
  console.log(t)
  console.log(utc2beijing(t))
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
        <span>{article.updateTime+calcTime(article.updateTime)+"前更新"}</span>
      </div>
    </div>
  );
}

export default ArticleCard;