import { request } from "../../utils/request";
import { IAccount, IUserInfo } from "./interface";

export async function signUp(data: IAccount): Promise<IUserInfo> {
  return (await request("signup", {
    account: data.account,
    password: data.password,
  })) as IUserInfo;
}
