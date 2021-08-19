import { createContext, useState } from "react";
import { IUserInfo } from "../apis/account/interface";

interface IGlobalContext {
  // userInfo为空代表未登录
  userInfo: null | IUserInfo;
  setUserInfo: (data: IUserInfo) => void;
}

export const GlobalContext = createContext<IGlobalContext>({
  userInfo: null,
  setUserInfo() {
    // default
  },
});

export function useGlobalContext() {
  const [userInfo, setUserInfo] = useState<null | IUserInfo>(null);

  return {
    userInfo,
    setUserInfo,
  };
}
