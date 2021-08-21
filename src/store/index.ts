import { createContext } from "react";
import { IGlobalContext } from "@/interface";

export const GlobalContext = createContext<IGlobalContext>({
  userInfo: null,
  signInModalVisible: false,
  setUserInfo() {
    // default
  },
  logout() {
    // default
  },
  on() {
    // default
  },
  showSignInModal() {
    // default
  },
  hideSignInModal() {
    // default
  }
});
