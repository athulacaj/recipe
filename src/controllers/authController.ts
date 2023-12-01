import AuthService from "../services/authService";
import { makeJwtToken } from "../utils/functions/jwtFunctions";
import { getJoiValidationErrorIfExists } from "../utils/functions/requestHandleFunction";
import { EmailLoginTypeMapper, EmailSignupTypeMapper } from "../utils/mapper/authMapper";
import { requestToHttpResponseMapper } from "../utils/mapper/httpMapper";
import { EmailLoginType } from "../utils/types/authTypes";
import { HttpRequest, HttpResponse } from "../utils/types/serverTypes";

class AuthController {
constructor(
    private readonly authService: AuthService,
) {}
  async login(req: HttpRequest,state="email"): Promise<HttpResponse> {
    var {error,value}:{error:any,value:EmailLoginType}=EmailLoginTypeMapper.validate(req.body);
    const validationErrorMsg=getJoiValidationErrorIfExists(error);
      if(validationErrorMsg)
        return requestToHttpResponseMapper(400,{msg:validationErrorMsg})
    // this.authService.login(req.body);
    
    const {result: resultObj, error: errorObj}=await this.authService.emailLogin(value);
    if(errorObj)
      return requestToHttpResponseMapper(400,{msg:errorObj})
    return requestToHttpResponseMapper(200,{data:{
      token:makeJwtToken(resultObj),
      user:resultObj
    }})
  }

  async signup(req: HttpRequest): Promise<HttpResponse> {
    const { error, value } = EmailSignupTypeMapper.validate(req.body);
    const validationErrorMsg = getJoiValidationErrorIfExists(error);
    if (validationErrorMsg) {
      return requestToHttpResponseMapper(400, { msg: validationErrorMsg });
    }
    const { result: resultObj, error: errorObj } = await this.authService.signup(value);
    if (errorObj) {
      if (errorObj.code === "P2002") {
        return requestToHttpResponseMapper(400, { msg: "Email already exists",data: errorObj });
      }
      return requestToHttpResponseMapper(400, {msg:"Failed to create user",data: errorObj });
    }
    return requestToHttpResponseMapper(200, { data: resultObj });
  }
}


export default AuthController;