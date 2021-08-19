import { IAccount } from "./interface";
import { IRequestResult, request } from "../../utils/request";

export async function signIn(data: IAccount): Promise<IRequestResult> {
  return await request("signin", data);
}
