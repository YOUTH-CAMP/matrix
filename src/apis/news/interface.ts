export interface INews {
  title: string;
  content: string;
  time: string;
  link: string;
  source?: string;
  imageSrc?: string;
}

export interface INewsList {
  messageList: INews[];
}
