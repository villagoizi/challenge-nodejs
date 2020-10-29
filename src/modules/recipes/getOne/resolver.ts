import { combineResolvers } from "graphql-resolvers"
import { isAuthenticated } from "../../../security/auth"
import { getOneRecipe } from "./getOne"


export const resolver = {
    Query: {
        getOneRecipe: combineResolvers(isAuthenticated, getOneRecipe)
    }
}