import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated } from "../../../security/auth";
import { myRecipes } from "./myRecipes";


export const resolver = {
    Query: {
        getMyRecipes: combineResolvers(isAuthenticated, myRecipes)
    }
}