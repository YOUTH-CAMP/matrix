export interface INews {
  title: string;
  content: string;
  time: string;
  link: string;
}

export interface INewsList {
  messageList: INews[];
}
