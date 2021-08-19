import { Form, message } from "antd";
import { useState } from "react";
import { useRequest } from "../../../hooks/useRequest";
import { IUserInfo } from "../../../apis/account/interface";

export function useIndexLogic(setUserInfo: (data: IUserInfo) => void) {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const { loading: signInLoading, run: signIn } = useRequest("signin", {
    manual: true,
  });
  const { loading: signUpLoading, run: signUp } = useRequest("signup", {
    manual: true,
  });

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

      if (!res.success) {
        message.error(res.errorMessage);
      } else {
        setUserInfo(res.data as IUserInfo);
      }
    } catch (e) {
      // 捕获form.validateFields的错误，antd会自行处理，不做其他处理
    }
  };
  const toggleVisible = (isVisible: boolean) => {
    if (!isVisible) {
      form.resetFields();
    }
    setVisible(isVisible);
  };
  return {
    form,
    clickHandler,
    visible,
    toggleVisible,
    signInLoading,
    signUpLoading,
  };
}
