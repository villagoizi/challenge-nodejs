import { combineResolvers } from 'graphql-resolvers'
import { isAuthenticated } from '../../../security/auth'
import { createCategory } from './create'

export const resolver = {
    Mutation: {
        createCategory: combineResolvers(isAuthenticated, createCategory)
    }
}