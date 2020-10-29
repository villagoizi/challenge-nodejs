import {AuthenticationError, ApolloError} from 'apollo-server-express'
import {getRepository} from 'typeorm'
import { User } from '../../../entity';
import {Data} from './types'
import {compare} from 'bcrypt'
import { Context } from '../../../utils/typesGlobal';
import { generateJWT } from '../../../security/auth';

export const login = async (_:any, {data}:Data, {res,req}:Context): Promise<string | Error> => {
    try {
        const userRepo = getRepository(User)
        const user: User|undefined = await userRepo.findOne({where: {email: data.email }})
        if(!user) {
            throw new AuthenticationError('Email or password incorrect')
        }
        const isPasswordCorrect = await compare(data.password, user.password)
        if(!isPasswordCorrect) {
            throw new AuthenticationError('Email or password incorrect')
        }
        const token = generateJWT({userId: user.id})
        res.header('Authorization', `Bearer ${token}`)
        return token
    } catch (e) {
        console.log(e)
        throw new AuthenticationError('Email or password incorrect')  
    }
}