import { IUserInfo } from "@/apis/account/interface";
import { GlobalEventName } from "../typings/type";

export interface IGlobalContext {
  // userInfo为空代表未登录
  userInfo: null | IUserInfo;
  setUserInfo: (data: IUserInfo) => void;
  logout: () => void;
  on: (globalEventName: GlobalEventName) => void;
}
