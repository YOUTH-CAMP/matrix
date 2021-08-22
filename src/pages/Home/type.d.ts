type articleList = {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  key: string;
  url: string;
  logoImg: string;
  classify: string;
  content: {
    itemTitle: string;
    itemContent: string;
    href?: string;
  }[];
};
