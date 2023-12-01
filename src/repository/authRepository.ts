import { Prisma, PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();


class AuthRepository{

    async createUser(user:Prisma.UserCreateInput): Promise<User> {
        return  prisma.user.create({
            data:user
        })       
    }

    async updateUser(id: string, user: Prisma.UserUpdateInput): Promise<User> {
        return prisma.user.update({
            where: {
                id: id
            },
            data: user
        });
    }

    async getUser(whereObj:Prisma.UserWhereUniqueInput): Promise<User | null> {
        return prisma.user.findUnique({
            where:whereObj
        });
    }

}

export default AuthRepository;