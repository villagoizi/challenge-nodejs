import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated } from "../../../security/auth";
import { createRecipe } from "./create";
import { category } from "./fieldCategory";
import { validateRecipe } from "./policy";

export const resolver = {
    Mutation: {
        createRecipe: combineResolvers(isAuthenticated, validateRecipe, createRecipe)
    },
    Recipe: {
        category: category
    }
}