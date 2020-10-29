import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated } from "../../../security/auth";
import { isOwner } from "./isOwner";
import { deleteRecipe } from './delete'

export const resolver = {
    Mutation: {
        deleteRecipe: combineResolvers(isAuthenticated, isOwner, deleteRecipe)
    }
}
