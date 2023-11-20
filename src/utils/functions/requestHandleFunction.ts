import Joi from "joi";
import { requestToHttpResponseMapper } from "../mapper/httpMapper";

function getJoiValidationErrorMsgIfExists(error:Joi.ValidationError | undefined):string|null {
    if(!error){
        return null;
    }
    const errorMessages = error.details.map((detail:Joi.ValidationErrorItem) => detail.message);
    return errorMessages.join(",");
}



export {getJoiValidationErrorMsgIfExists as getJoiValidationErrorIfExists}