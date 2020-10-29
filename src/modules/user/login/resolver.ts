import { combineResolvers } from 'graphql-resolvers'
import {validateLogin} from './policy'
import {login} from './login'


export const resolver = {
    Mutation: {
        login: combineResolvers(validateLogin, login)
    }
}