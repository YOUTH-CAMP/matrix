import { useState } from "react";
import { IUserInfo } from "@/apis/account/interface";
import { IGlobalContext } from "@/interface";
import { GlobalEventName } from "@/constants/GlobalEventName";
import { LocalstorageKey } from "@/constants";
import { message } from "antd";

export function useGlobalContext(): IGlobalContext {
  const [userInfo, setUserInfo] = useState<null | IUserInfo>(null);
  const [signInModalVisible, setSignInModalVisible] = useState(false);
  const [globalEvent, setGlobalEvent] = useState<{
    [k: string]: Array<() => void>;
  }>({});

  const logout = () => {
    console.log("call logout");
    setUserInfo(null);
    localStorage.removeItem(LocalstorageKey.userInfo);
    globalEvent[GlobalEventName.logout]?.forEach((fn) => fn());
    message.success("退出登录成功");
  };

  const on = (globalEventName: GlobalEventName, callback: () => void) => {
    setGlobalEvent((eventMap) => {
      const fnList = eventMap[globalEventName] ?? [];
      return {
        ...eventMap,
        [globalEventName]: fnList.concat(callback),
      };
    });
  };

  const showSignInModal = () => {
    setSignInModalVisible(true);
  };

  const hideSignInModal = () => {
    setSignInModalVisible(false);
  };

  return {
    userInfo,
    setUserInfo,
    logout,
    on,
    showSignInModal,
    hideSignInModal,
    signInModalVisible,
  };
}
