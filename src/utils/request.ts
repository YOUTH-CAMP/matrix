export type RequestFn = (
  fnName: string,
  data?: unknown
) => Promise<IRequestResult>;

export interface IRequestResult {
  success: boolean;
  message?: string;
  data?: unknown;
}

export const request: RequestFn = async (fnName: string, data?: unknown) => {
  const headers = new Headers([["Content-Type", "application/json"]]);
  const req: RequestInit = {
    method: "POST",
    headers,
  };
  if (data) {
    req.body = JSON.stringify(data);
  }
  try {
    const res = await fetch(
      `https://qc6rfd.fn.thelarkcloud.com/${fnName}`,
      req
    );
    return await res.json();
  } catch (e) {
    return {
      success: false,
      message: e.errorMessage ?? e.message ?? e,
    };
  }
};
