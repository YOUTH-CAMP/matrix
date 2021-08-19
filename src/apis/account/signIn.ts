import { IAccount, IUserInfo } from "./interface";
import { request } from "../../utils/request";

export async function signIn(data: IAccount): Promise<IUserInfo> {
  return (await request("signin", data)) as IUserInfo;
}
