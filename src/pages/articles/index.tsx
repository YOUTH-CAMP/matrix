/*
 * @Description:
 * @Version:
 * @Author: Lida
 * @Date: 2021-08-19 21:58:44
 * @LastEditors: Lida
 * @LastEditTime: 2021-08-19 23:27:08
 */
import * as React from "react";
import ArticleCard from "../Home/components/ArticleCard";
import { request } from "../../utils/request";

type ArticleData = {
  success: boolean;
  data: Array<any>;
};

const Home: React.FC = () => {
  const [articlesList, setArticlesList] = React.useState<any[]>([
    {
      name: "0",
      classificationId: 0,
      articles: [{ id: 0, title: "", isClosed: false }],
    },
  ]);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  React.useEffect(() => {
    const fetchData = async () => {
      const res = (await request("articleList")) as ArticleData;
      setLoaded(res.success);
      setArticlesList(res.data);
    };
    !loaded && fetchData();
  }, []);

  return (
    <>
      {loaded &&
        articlesList.map((item, index) => {
          return <ArticleCard key={"card-" + index} article={item} />;
        })}
    </>
  );
};
export default Home;
