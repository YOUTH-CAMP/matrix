import React, { useContext } from "react";
import { Button, Modal, Form, Input, PageHeader } from "antd";
import styles from "./index.module.less";
import { useIndexLogic } from "./useIndexLogic";
import { GlobalContext } from "@/store";

export function SignIn(): JSX.Element {
  const { setUserInfo } = useContext(GlobalContext);
  const {
    form,
    clickHandler,
    visible,
    toggleVisible,
    signInLoading,
    signUpLoading,
  } = useIndexLogic(setUserInfo);

  function render(): JSX.Element {
    const colStyle = {
      width: "60%",
    };
    return (
      <div>
        <Button shape="round" onClick={() => toggleVisible(true)}>
          登录 / 注册
        </Button>

        <Modal
          visible={visible}
          closable={false}
          footer={null}
          onCancel={() => toggleVisible(false)}
        >
          <div className={styles.body}>
            <h1 className={styles.title}>Matrix</h1>
            <p style={{ marginBottom: 12, color: "#999" }}>
              全网资讯一站式浏览
            </p>

            <Form style={colStyle} form={form}>
              <Form.Item
                name="account"
                rules={[{ required: true, message: "请输入用户名" }]}
              >
                <Input placeholder={"请输入用户名"} />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "请输入密码" }]}
              >
                <Input.Password placeholder={"请输入密码"} />
              </Form.Item>
            </Form>
            <Button
              style={{ ...colStyle, marginTop: 16 }}
              type={"primary"}
              onClick={() => clickHandler("signIn")}
              loading={signInLoading}
              disabled={signUpLoading}
            >
              登录
            </Button>
            <div style={{ color: "#999" }}>-or-</div>
            <Button
              style={{ ...colStyle, marginBottom: 16 }}
              onClick={() => clickHandler("signUp")}
              loading={signUpLoading}
              disabled={signInLoading}
            >
              注册
            </Button>
          </div>
        </Modal>
      </div>
    );
  }

  return render();
}
