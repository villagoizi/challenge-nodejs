import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated } from "../../../security/auth";
import { updateCategory } from "./update";

export const resolver = {
    Mutation: {
        updateCategory: combineResolvers(isAuthenticated, updateCategory)
    }
}