
interface EmailLoginType{
    email: string;
    password: string;
}

interface MobileLoginType{
    phone: string;
}

interface EmailSignupType{
    sate:"email";
    email: string;
    password: string;
    name:string;
}

export {EmailLoginType,MobileLoginType,EmailSignupType};