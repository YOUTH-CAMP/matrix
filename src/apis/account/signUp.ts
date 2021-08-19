import { IRequestResult, request } from "../../utils/request";
import { IAccount } from "./interface";

export async function signUp(data: IAccount): Promise<IRequestResult> {
  return await request("signup", {
    account: data.account,
    password: data.password,
  });
}
