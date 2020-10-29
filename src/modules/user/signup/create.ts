import {AuthenticationError} from 'apollo-server-express'
import {getRepository, InsertResult, Repository} from 'typeorm'
import { User } from '../../../entity';
import {hash} from 'bcrypt'
import {Data} from './types'
import { Context } from '../../../utils/typesGlobal';
import { generateJWT } from '../../../security/auth';

export const signup = async (_:any, {data}:Data, {req,res}:Context) => {
    const userRepo: Repository<User> = getRepository(User)
    const isExits: User | undefined = await userRepo.findOne({where: {email: data.email }})
    if(isExits) {
        throw new AuthenticationError('Email is already exist')
    }
    const hashPassword = await hash(data.password, 10)
    const create: InsertResult = await userRepo.createQueryBuilder('user')
                .insert()
                .into(User)
                .values({
                ...data,
                password: hashPassword
                })
                .returning(["id", "email","name"])
                .execute()
    const user: User = create.raw[0]
    const token = generateJWT({userId: user.id})
    res.header('Authorization', `Bearer ${token}`)
    req.userId = user.id
    return token;
}