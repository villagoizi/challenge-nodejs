import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated } from "../../../security/auth";
import { getCategories } from "./getCategories";


export const resolver = {
    Query: {
        getCategories: combineResolvers(isAuthenticated, getCategories)
    }
}