import { HttpResponse } from "../types/httpTypes";

 const makeHttpResponse = (statusCode:number,data: Record<string, any>): HttpResponse => ({
    body: data,
    statusCode: 200
  })

  export {makeHttpResponse}
