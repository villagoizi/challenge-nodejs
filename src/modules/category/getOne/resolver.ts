import {combineResolvers} from 'graphql-resolvers'
import { isAuthenticated } from '../../../security/auth'
import { getOne } from './getOne'

export const resolver = {
    Query: {
        getOneCategory: combineResolvers(isAuthenticated, getOne)
    }
}