/*
 * @Description:
 * @Version:
 * @Author: Lida
 * @Date: 2021-08-19 21:47:27
 * @LastEditors: Lida
 * @LastEditTime: 2021-08-19 21:50:39
 */
type Article = {
  id: number;
  title: string;
  href?: string;
  isClosed: boolean;
};
type ArticleList = {
  name: string;
  classificationId: number;
  articles: Article[];
  updatetime?: string;
  articlecount?: number;
};
