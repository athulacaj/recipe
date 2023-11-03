import { HttpRequest, HttpResponse } from "../types/serverTypes";
import { Request } from 'express';

 const makeHttpResponse = (statusCode:number,data: Record<string, any>): HttpResponse => ({
    body: data,
    statusCode: 200
  })

const makeHttpRequest= (req: Request) => {
  const httpRequest: HttpRequest = {
    headers:req.headers,
    body: req.body,
    params: req.params,
    query:req.query
  }
  return httpRequest;
}

  export {makeHttpResponse,makeHttpRequest}
