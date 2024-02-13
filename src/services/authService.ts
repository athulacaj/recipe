import { Prisma } from "@prisma/client";
import AuthRepository from "../repository/authRepository";
import { EmailLoginType, EmailSignupType, MobileLoginType } from "../utils/types/authTypes";
import bcrypt from "bcrypt";
import { ServiceReturnType } from "../utils/types/serviceTypes";

class AuthService {
    constructor(private readonly authRepository: AuthRepository) { }
    async emailLogin(loginBody: EmailLoginType): Promise<ServiceReturnType> {
        let whereObj: Prisma.UserWhereUniqueInput;
        let errorObj;
        let resultObj;
        whereObj = { email: loginBody.email };
        console.log(whereObj);
        const user = await this.authRepository.getUser(whereObj);
        if (user == null) {
            errorObj = "invalid credentials";
        } else {
            const isPasswordValid = await bcrypt.compare(loginBody.password, user.password);
            if (!isPasswordValid) {
                errorObj = "invalid credentials";
            } else
                resultObj = user;
        }
        return { result:resultObj, error: errorObj };
    }
    async signup(signupuBody: EmailSignupType): Promise<ServiceReturnType> {
        let errorObj:any;
        let resultObj:any;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(signupuBody.password, salt);
            const user: Prisma.UserCreateInput = {
                email: signupuBody.email,
                password: hashedPassword,
                name: signupuBody.name
            }
            return this.authRepository.createUser(user).then((user) => {
                console.log(user);
                resultObj = user;
                return { result:resultObj, error: errorObj };
            }).catch((err) => {
                console.log(err);
                errorObj = err;
                return { result:resultObj, error:errorObj };
            });
    }
}

export default AuthService;