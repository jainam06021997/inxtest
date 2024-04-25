interface HttpResponse<T> extends Response {
    success: boolean;
    data: T;
  }
  
  const http = async <T>(
    url: string,
    args: RequestInit
  ): Promise<HttpResponse<T> | unknown> => {
    try {
      const headers: HeadersInit = {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
        "Access-Control-Max-Age": "86400",
      };
      const requestArgs: RequestInit = { ...args, headers };
      const request: RequestInfo = new Request(url, requestArgs);
      const response = await fetch(request);
      return response.json();
    } catch (err) {
      return err;
    }
  };
  
  const get = async <T>(
    path: string,
    args: RequestInit = { method: 'GET' }
  ): Promise<HttpResponse<T> | unknown> => {
    return http<T>(path, args);
  };
  
  const post = async <T>(
    path: string,
    body: unknown,
    args: RequestInit = { method: 'POST', body: JSON.stringify(body) }
  ): Promise<HttpResponse<T> | unknown> => {
    return http<T>(path, args);
  };
  
  const put = async <T>(
    path: string,
    body: unknown,
    args: RequestInit = { method: 'PUT', body: JSON.stringify(body) }
  ): Promise<HttpResponse<T> | unknown> => {
    return http<T>(path, args);
  };
  
  const del = async <T>(
    path: string,
    args: RequestInit = { method: 'DELETE' }
  ): Promise<HttpResponse<T> | unknown> => {
    return http<T>(path, args);
  };
  
  export default {
    get,
    post,
    put,
    del,
  };
  