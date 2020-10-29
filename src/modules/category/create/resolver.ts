import { combineResolvers } from 'graphql-resolvers'
import { isAuthenticated } from '../../../security/auth'
import { createCategory } from './create'
import { validateCategory } from './policy'

export const resolver = {
    Mutation: {
        createCategory: combineResolvers(isAuthenticated, validateCategory, createCategory)
    }
}