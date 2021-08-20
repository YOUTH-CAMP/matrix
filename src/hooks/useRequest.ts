import { useEffect, useState } from "react";
import { IRequestResult, request } from "../utils/request";

interface IUseRequestParams {
  defaultLoading?: boolean;
  initData?: unknown;
  manual?: boolean;
}

export function useRequest(
  fn: string | ((args?: unknown) => Promise<IRequestResult>),
  params?: IUseRequestParams
) {
  const defaultLoading = params?.defaultLoading ?? false;
  const initData = params?.initData ?? null;
  const manual = params?.manual ?? false;

  const [loading, setLoading] = useState(defaultLoading);
  const [data, setData] = useState(initData);
  const [requestParams, setRequestParams] = useState<unknown>(undefined);

  const _request = async (args?: unknown): Promise<IRequestResult> => {
    setLoading(true);
    const res =
      typeof fn === "string" ? await request(fn, args) : await fn(args);
    setLoading(false);
    setData(res);
    return res;
  };

  const run = async (args: unknown) => {
    setRequestParams(args);
    return _request(args);
  };

  const refresh = async () => {
    return _request(requestParams);
  };

  useEffect(() => {
    if (!manual) {
      _request();
    }
  }, []);

  return {
    loading,
    data,
    run,
    refresh,
  };
}
