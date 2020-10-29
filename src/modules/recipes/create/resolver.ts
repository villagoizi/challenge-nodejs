import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated } from "../../../security/auth";
import { createRecipe } from "./create";
import { category } from "./fieldCategory";

export const resolver = {
    Mutation: {
        createRecipe: combineResolvers(isAuthenticated, createRecipe)
    },
    Recipe: {
        category: category
    }
}