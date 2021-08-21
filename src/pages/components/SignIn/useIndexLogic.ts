import { Form, message } from "antd";
import { useContext } from "react";
import { useRequest } from "@/hooks/useRequest";
import { IUserInfo } from "@/apis/account/interface";
import { GlobalContext } from "@/store";

export function useIndexLogic(setUserInfo: (data: IUserInfo) => void) {
  const {showSignInModal, hideSignInModal, signInModalVisible} = useContext(GlobalContext);

  const [form] = Form.useForm();
  const { loading: signInLoading, run: signIn } = useRequest("signin", {
    manual: true,
  });
  const { loading: signUpLoading, run: signUp } = useRequest("signup", {
    manual: true,
  });

  const toggleVisible = (isVisible: boolean) => {
    if (!isVisible) {
      form.resetFields();
      hideSignInModal();
    } else {
      showSignInModal();
    }
  };

  const clickHandler = async (type: "signIn" | "signUp") => {
    try {
      const data = await form.validateFields();
      let res;
      // 登录注册成功均返回userInfo，逻辑暂不分开处理
      if (type === "signIn") {
        res = await signIn(data);
      } else {
        res = await signUp(data);
      }
      if (res.success) {
        message.success(res.message);
        setUserInfo(res.data as IUserInfo);
        toggleVisible(false);
      } else {
        message.error(res.message);
      }
    } catch (e) {
      // 捕获form.validateFields的错误，antd会自行处理，不做其他处理
    }
  };

  return {
    form,
    clickHandler,
    visible: signInModalVisible,
    toggleVisible,
    signInLoading,
    signUpLoading,
  };
}
