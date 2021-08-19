import * as React from "react";
import ArticleCard from "./components/ArticleCard";
import { request } from "../../utils/request";

type ArticleData = {
  success: boolean;
  data: Array<ArticleList>;
};

const Home: React.FC = () => {
  const [articlesList, setArticlesList] = React.useState<ArticleList[]>([
    {
      name: "0",
      classificationId: 1,
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
