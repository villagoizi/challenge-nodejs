import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated } from "../../../security/auth";
import { getRecipes } from './getAll'


export const resolver = {
    Query: {
        getRecipes: combineResolvers( isAuthenticated, getRecipes)
    }
}