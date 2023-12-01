import Joi from "joi";
import { EmailLoginType, EmailSignupType, MobileLoginType } from "../types/authTypes";

const EmailLoginTypeMapper = Joi.object<EmailLoginType>({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})


const MobileLoginTypeMapper = Joi.object<MobileLoginType>({
    phone: Joi.string().required()
})


const EmailSignupTypeMapper = Joi.object<EmailSignupType>({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required()
})

export { EmailLoginTypeMapper, MobileLoginTypeMapper, EmailSignupTypeMapper };