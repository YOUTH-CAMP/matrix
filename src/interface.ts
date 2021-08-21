import { IUserInfo } from "@/apis/account/interface";
import { GlobalEventName } from "@/constants/GlobalEventName";

export interface IGlobalContext {
  // userInfo为空代表未登录
  userInfo: null | IUserInfo;
  setUserInfo: (data: IUserInfo) => void;
  logout: () => void;
  showSignInModal: () => void;
  hideSignInModal: () => void;
  on: (globalEventName: GlobalEventName, callback: () => void) => void;
  signInModalVisible: boolean;
}
