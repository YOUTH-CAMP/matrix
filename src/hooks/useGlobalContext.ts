import { useState } from "react";
import { IUserInfo } from "../apis/account/interface";
import { IGlobalContext } from "../interface";
import { GlobalEventName } from "../constants/GlobalEventName";
import { LocalstorageKey } from "../constants";

export function useGlobalContext(): IGlobalContext {
  const [userInfo, setUserInfo] = useState<null | IUserInfo>(null);
  const [globalEvent, setGlobalEvent] = useState<{
    [k: string]: Array<() => void>;
  }>({});

  const logout = () => {
    console.log("call logout");
    setUserInfo(null);
    localStorage.removeItem(LocalstorageKey.userInfo);
    globalEvent[GlobalEventName.logout]?.forEach((fn) => fn());
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

  return {
    userInfo,
    setUserInfo,
    logout,
    on,
  };
}
