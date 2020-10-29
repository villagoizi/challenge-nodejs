import {validateRegister} from './policy'
import {combineResolvers} from 'graphql-resolvers'
import { signup } from "./create";

export const resolver = {
    Mutation: {
        signup: combineResolvers(validateRegister, signup)
    }
}