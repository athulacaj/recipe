import { HttpRequest, HttpResponse } from "../types/serverTypes";
import { Request } from 'express';

 const requestToHttpResponseMapper = (statusCode:number,data: Record<string, any>): HttpResponse => ({
    body: data,
    statusCode: statusCode
  })

const requestToHttpRequestMapper= (req: Request) => {
  const httpRequest: HttpRequest = {
    headers:req.headers,
    body: req.body,
    params: req.params,
    query:req.query
  }
  return httpRequest;
}

  export {requestToHttpResponseMapper,requestToHttpRequestMapper}
