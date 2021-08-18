/*
 * @Description: 资讯卡片基础布局样式
 * @Author: Lida
 * @Date: 2021-08-18 09:49:53
 * @LastEditors: Lida
 * @LastEditTime: 2021-08-18 15:46:20
 */
import * as React from "react";
import { Row, Col } from "antd";
import "./style.less";

type News = {
  content: string;
  date: string;
  href: string;
};
type NewsList = {
  channel: string;
  newslist: News[];
  updatetime: string;
  newscount: number;
};

const list: News[] = [
  {
    content: "测试测试测试测试测试测试测试测试测试测试测试",
    date: "2021/08",
    href: "https://s.weibo.com/weibo?q=阿富汗&Refer=top",
  },
  {
    content: "测试测试测试测试测试",
    date: "2021/08",
    href: "https://s.weibo.com/weibo?q=阿&Refer=top",
  },
  {
    content: "测试测试测试测试测试测试测试",
    date: "2021/08",
    href: "https://s.weibo.com/weibo?q=阿富&Refer=top",
  },
  {
    content: "测试测试测试",
    date: "2021/08",
    href: "https://s.weibo.com/weibo?q=汗&Refer=top",
  },
  {
    content: "测试测试测试测试测试",
    date: "2021/08",
    href: "https://s.weibo.com/weibo?q=阿富汗5&Refer=top",
  },
  {
    content: "测试测试测试测试测试测试测试",
    date: "2021/08",
    href: "https://s.weibo.com/weibo?q=阿富汗4&Refer=top",
  },
  {
    content: "测试测试测试测试测试测试测试测试测试测试测试",
    date: "2021/08",
    href: "https://s.weibo.com/weibo?q=阿富汗3&Refer=top",
  },
  {
    content: "测试测试测试测试",
    date: "2021/08",
    href: "https://s.weibo.com/weibo?q=阿富汗2&Refer=top",
  },
  {
    content: "测试测试测试测试测试测试",
    date: "2021/08",
    href: "https://s.weibo.com/weibo?q=阿富汗1&Refer=top",
  },
];
const news: NewsList = {
  channel: "微博热搜",
  newslist: list,
  updatetime: "3分钟前",
  newscount: list.length,
};

const NewsCard = () => {
  return (
    <div className="newsbox">
      <div className="newstitle">{news.channel}</div>
      <div className="newslist">
        <ul>
          {news.newslist.map((item, index) => (
            <li key={news.channel + index}>
              <a href={item.href} target="_blank" rel="noreferrer">
                <span className="policies-line"></span>
                <Row>
                  <Col span={30}>
                    <span>{item.content}</span>
                  </Col>
                </Row>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="newsfooter">
        <span>{news.updatetime + "更新 - " + news.newscount + "条"}</span>
      </div>
    </div>
  );
};

export default NewsCard;
