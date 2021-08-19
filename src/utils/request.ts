export type RequestFn = (fnName: string, data?: unknown) => Promise<unknown>;

export const request: RequestFn = async (fnName: string, data?: unknown) => {
  const headers = new Headers();
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
      errorMessage: e.errorMessage ?? e.message ?? e,
    };
  }
};
