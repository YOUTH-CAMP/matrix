export async function request(fnName: string, data?: unknown) {
  const headers = new Headers();
  const req: RequestInit = {
    method: "POST",
    headers,
  };
  if (data) {
    req.body = JSON.stringify(data);
  }
  const res = await fetch(`https://qc6rfd.fn.thelarkcloud.com/${fnName}`, req);
  // TODO 错误处理
  return await res.json();
}
