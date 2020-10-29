import * as dotenv from 'dotenv'
dotenv.config()
import { sign,verify } from 'jsonwebtoken'
import {skip} from 'graphql-resolvers'
import { Context } from '../utils/typesGlobal'

const secret: string = (process.env.JWT_SECRET as string) || 'secret'
export const isAuthenticated = (_:any, __:any, { userId }:Context ) =>  userId ? skip : new Error('Not authenticated')
export const generateJWT = (payload: Payload) => sign(payload, secret, { expiresIn: '10h' })

export const verifyJWT = async (req: any) => {
        req.userId = null
        try {
            const token = req.get('Authorization')
            if(token){
                const data: any = verify(token, secret)
                req.userId = data.userId
            }
        } catch {}
    }

interface Payload {
    userId: number
}
