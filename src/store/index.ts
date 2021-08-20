import { createContext } from "react";
import { IGlobalContext } from "@/interface";

export const GlobalContext = createContext<IGlobalContext>({
  userInfo: null,
  setUserInfo() {
    // default
  },
  logout() {
    // default
  },
  on() {
    // default
  },
});
