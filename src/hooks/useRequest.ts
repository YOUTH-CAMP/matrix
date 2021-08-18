import { useEffect, useState } from "react";

interface IUseRequestParams {
  defaultLoading?: boolean;
  initData?: unknown;
  manual?: boolean;
}

export function useRequest(
  fn: (args?: unknown) => Promise<unknown>,
  params?: IUseRequestParams
) {
  const defaultLoading = params?.defaultLoading ?? false;
  const initData = params?.initData ?? null;
  const manual = params?.manual ?? false;

  const [loading, setLoading] = useState(defaultLoading);
  const [data, setData] = useState(initData);
  const [requestParams, setRequestParams] = useState<unknown>(undefined);

  const request = async (args?: unknown) => {
    setLoading(true);
    const res = await fn(args);
    setLoading(false);
    setData(res);
    return res;
  };

  const run = async (args: unknown) => {
    setRequestParams(args);
    return request(args);
  };

  const refresh = async () => {
    return request(requestParams);
  };

  useEffect(() => {
    if (!manual) {
      request();
    }
  }, []);

  return {
    loading,
    data,
    run,
    refresh,
  };
}
