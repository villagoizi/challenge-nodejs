import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated } from "../../../security/auth";
import { deleteCategory } from "./delete";

export const resolver = {
    Mutation: {
        deleteCategory: combineResolvers(isAuthenticated, deleteCategory) 
    }
}