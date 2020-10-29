import { combineResolvers } from 'graphql-resolvers'
import { isAuthenticated } from '../../../security/auth'
import {isOwner} from '../delete/isOwner'
import { updateRecipe } from './update'

export const resolver = {
    Mutation: {
        updateRecipe: combineResolvers(isAuthenticated, isOwner, updateRecipe)
    }
}
